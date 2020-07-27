function naverSignInCallback(naver_id_login) {
    console.log(naver_id_login);
    $.get("http://192.249.19.242:7380/login"
            + "?email=" + naver_id_login.getProfileData('email'), (data) => {
        console.log(data);
        if (data == "success") {
            window.opener.location = naver_id_login.redirect_uri;
            window.close();
        } else {
            /* Show error message */
            /* sign up page */
            // window.location = 
        }
    })
}