function naverSignInCallback(naver_id_login) {
    console.log(naver_id_login);
    $.get("http://13.125.47.50/login/naver/check"
            + "?email=" + naver_id_login.getProfileData('email'), (data) => {
        if (data == "success") {
            window.opener.location = "http://13.125.47.50";
        } else {
            let url = "http://13.125.47.50/signup/naver"
                + "?email=" + naver_id_login.getProfileData('email')
                + "&name=" + encodeURIComponent(naver_id_login.getProfileData('name'));

            window.opener.location = url;
        }
        window.close();
    })
}