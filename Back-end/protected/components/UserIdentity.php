<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
    public $_model;

	public function authenticate()
	{
        $this->_model = User::model()->findByAttributes(array("email" => $this->username));
        if (is_null($this->_model)) {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
            return;
        }
        if ($this->_model) { // && $_POST["LoginForm"]["password"] == $this->_model->password) {
            $users = array(
                $this->_model->email => $this->_model->password
            );
        }

        if (!isset($users[$this->username]))
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        elseif ($users[$this->username] !== sha1($this->password))
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        else
            $this->errorCode = self::ERROR_NONE;

        $a = $this->_model->attributes;
        if (isset($a["password"])) unset($a["password"]);
        $this->setState('status', (int)$this->_model->status);
        $this->setState('userdata', $a);
        return !$this->errorCode;
	}
}