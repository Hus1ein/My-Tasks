<?php

class ApiController extends Controller
{

    private function checkUser()
    {
        if (Yii::app()->user->isGuest) {
            $this->_sendResponse(500, 'Error: You are not authorized to perform this action', 'text/html');
        }
    }

	public function actionIndex()
	{
	    $this->checkUser();

	    var_dump(Yii::app()->getSession()->getSessionId());
	    echo Yii::app()->user->id;
		//$this->render('index');
	}

    public function actionLogin() {

        if (isset($_POST['username']) && isset($_POST['password'])) {

           foreach ($_POST as $post) {
                $post = escapeshellarg($post);
                $post = escapeshellcmd($post);
                $post = htmlspecialchars($post);
            }
            $email = $_POST['username'];
            $user = User::model()->findByAttributes(compact('email')); //array(1) {['email'] => "email_address_from_$email"}
            $model = new LoginForm();
            $model->username = $email;
            $model->password = $_POST['password'];
            $model->rememberMe = 3600 * 24 * 7; // 7 days
            if ($model->login()) {
                $response = array();
                $response['session_id'] = Yii::app()->getSession()->getSessionId();
                $response['id'] = $user->id;
                $response['email'] = $user->email;
                $response['firstname'] = $user->firstname;
                $response['lastname'] = $user->lastname;
                $this->_sendResponse(200, CJSON::encode($response), 'text/json');
            } else
                $this->_sendResponse(500, 'Error: Wrong username or password', 'text/html');
        } else {
            $this->_sendResponse(401, 'Error: Missing parameters', 'text/html');
        }
    }

    public function actionSignUp() {

        if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['firstName']) &&
            isset($_POST['lastName'])) {

            foreach ($_POST as $post) {
                $post = escapeshellarg($post);  // Escape a string to be used as a shell argument
                $post = escapeshellcmd($post);  // Escape shell metacharacters
                $post = htmlspecialchars($post);
            }

            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            if (is_string($email) && is_string($password) && is_string($firstName) &&
                is_string($lastName) && strlen($password) > 8){

                if (strpos($firstName, " ") === false && strpos($lastName, " ")  === false &&
                    strpos($email, " ") === false && strpos($password, " ") === false) {

                    if (User::model()->findByAttributes(['email' => $email])) {
                        $this->_sendResponse(500, 'Error: This user already exists', 'text/html');
                    } else {
                        $user = new User();
                        $user->status = 0;
                        $user->email = ($this->checkEmail($email)) ? false : $email;
                        if (!($user->email)) {
                            $this->_sendResponse(500, 'Error: The email is not valid', 'text/html');
                        }
                        $user->firstname = filter_var($firstName, FILTER_SANITIZE_STRING);
                        $user->lastname = filter_var($lastName, FILTER_SANITIZE_STRING);
                        $user->password = sha1($password);

                        if ($user->save()) {
                            $this->_sendResponse(200, CJSON::encode($user), 'text/json');
                        } else {
                            $this->_sendResponse(500, 'Error while save new user', 'text/html');
                        }
                    }

                } else {
                    $this->_sendResponse(401, 'Error: Don\'t use white space', 'text/html');
                }
            } else {
                $this->_sendResponse(401, 'Error: Uncorrected parameters', 'text/html');
            }
        } else {
            $this->_sendResponse(401, 'Error: Missing parameters', 'text/html');
        }

    }

    private function checkEmail($mail)
    {
        $mail = filter_var($mail, FILTER_VALIDATE_EMAIL);
        $disposable_mail = file_get_contents(Yii::app()->getBasePath() . "/../protected/data/disposable-email.csv");
        $disposable_mail = explode(",", $disposable_mail);
        foreach ($disposable_mail as $disposable) {
            list(, $mail_domain) = explode('@', $mail);
            if (strcasecmp($mail_domain, $disposable) == 0) {
                return $mail;
            }
        }
        return false;
    }

    private function _getStatusCodeMessage($status) {
        $codes = Array(
            200 => 'OK',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }

    private function _sendResponse($status = 200, $body = '', $content_type = 'application/json', $cache = false) {
        header('Content-Type: ' . $content_type . '; charset=UTF-8');
        header("Access-Control-Allow-Origin: *"); //important for Reactjs

        if (!$cache) {
            header('Cache-Control: no-cache, must-revalidate');
            header('Expires: Mon, 1 Avg 1999 05:00:00 GMT');
        }
        // header('Transfer-Encoding: chunked');
        $status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
        header($status_header);

        if ($body != '') {
            echo $body;
        } else {

            $message = '';
            switch ($status) {
                case 401:
                    $message = 'You must be authorized to view this page.';
                    break;
                case 404:
                    $message = 'The requested URL ' . $_SERVER['REQUEST_URI'] . ' was not found.';
                    break;
                case 500:
                    $message = 'The server encountered an error processing your request.';
                    break;
                case 501:
                    $message = 'The requested method is not implemented.';
                    break;
            }

            $signature = ($_SERVER['SERVER_SIGNATURE'] == '') ? $_SERVER['SERVER_SOFTWARE'] . ' Server at ' . $_SERVER['SERVER_NAME'] . ' Port ' . $_SERVER['SERVER_PORT'] : $_SERVER['SERVER_SIGNATURE'];

            // this should be templated
            $body = '
                    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
                    <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
                        <title>' . $status . ' ' . $this->_getStatusCodeMessage($status) . '</title>
                    </head>
                    <body>
                        <h1>' . $this->_getStatusCodeMessage($status) . '</h1>
                        <p>' . $message . '</p>
                        <hr />
                        <address>' . $signature . '</address>
                    </body>
                    </html>';

            echo $body;
        }
        Yii::app()->end();
        die(0);
    }
}