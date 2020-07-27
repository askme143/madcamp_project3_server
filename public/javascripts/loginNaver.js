function naverSignInCallback(naver_id_login) {
    console.log(naver_id_login);
    $.get("http://192.249.19.244:1580/login"
            + "?email=" + naver_id_login.getProfileData('email'), (data) => {
        console.log(data);
        if (data == "success") {
            window.opener.location = naver_id_login.redirect_uri;
            window.close();
        } else {
            window.opener.location = "http://192.249.19.244:1580/signupNaver.html"
                                        + "?email=" + naver_id_login.getProfileData('email')
                                        + "&name=" + naver_id_login.getProfileData('name');
            window.close();
        }
    })
}