function naverSignInCallback(naver_id_login) {
    console.log(naver_id_login);
    $.get("http://192.249.19.244:1580/loginNaver"
            + "?email=" + naver_id_login.getProfileData('email'), (data) => {
        console.log(data);
        if (data == "success") {
            window.opener.location = "http://192.249.19.244:1580/main.html";
        } else {
            window.opener.location = "http://192.249.19.244:1580/signupNaver.html"
                                        + "?email=" + naver_id_login.getProfileData('email')
                                        + "&name=" + naver_id_login.getProfileData('name');
        }
        window.close();
    })
}