function loginCheck() {
    $.get("/loginCheck", (data) => {
        if (data == "success") {
            const profileBtn = document.querySelector("#login_btn a");
            const logoutBtn = document.querySelector("#signup_btn a");

            profileBtn.innerHTML = "프로필";
            profileBtn.setAttribute('href', "#");

            logoutBtn.innerHTML = "로그아웃";
            logoutBtn.setAttribute('href', "#");
            logoutBtn.addEventListener('click', (ev) => {
                const loginBtn = document.querySelector("#login_btn a");
                const signupBtn = document.querySelector("#signup_btn a");

                loginBtn.innerHTML = "로그인";
                loginBtn.setAttribute('href', "login.html");

                signupBtn.innerHTML = "회원가입";
                $.get("/logout", (data) => {
                    signupBtn.setAttribute('href', "signup.html");
                })
            })
        } else {
            console.log(data);
        }
    })
}

loginCheck();