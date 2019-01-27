


let login = async (event) => {
    event.preventDefault();
    let username = document.getElementById("email_field").value;
    let password = document.getElementById("password_field").value;
    if (username !== undefined && username !== "" && password !== undefined && password !== ""){

        try {
            const user = await app
                .auth()
                .signInWithEmailAndPassword(username, password);
            location.reload();
            alert("logovan si");
            // Change the text on login button to be log out
            document.getElementById("loginButtonInHomePage").value= "Log out";
            document.getElementById("loginButtonInHomePage").onclick = logout();
        } catch (error) {
            alert("Greska u username ili password")
        }

    }else {
        this.setState({'errors': "Enter valid username and password, don't use white space."});
    }

};

let logout = async () => {
    await app
        .auth()
        .signOut();

    location.reload();
    //
    document.getElementById("loginButtonInHomePage").value= "Login";
    document.getElementById("loginButtonInHomePage").onclick = showLoginForm();

};