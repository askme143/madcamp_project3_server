function isMobile(){
	var UserAgent = navigator.userAgent;

    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
     || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

function loginCheck() {
    $.get("/loginCheck", (data) => {
        if (data == "success") {
            var profileBtn = document.querySelector("#login_btn a");
            var logoutBtn = document.querySelector("#signup_btn a");
            const mobile = isMobile();

            if (!mobile) {
                profileBtn.innerHTML = "프로필";
                profileBtn.setAttribute('href', "#");
                logoutBtn.innerHTML = "로그아웃";
            } else {
                logoutBtn = profileBtn;
            }

            logoutBtn.setAttribute('href', "#");
            logoutBtn.addEventListener('click', (ev) => {
                const loginBtn = document.querySelector("#login_btn a");
                const signupBtn = document.querySelector("#signup_btn a");
                const mobile = isMobile();

                loginBtn.setAttribute('href', "login.html");
                if (!mobile) {
                    loginBtn.innerHTML = "로그인";
                    signupBtn.innerHTML = "회원가입";
                }

                $.get("/logout", (data) => {
                    if (!mobile)
                        signupBtn.setAttribute('href', "signup.html");
                })
            })
        } else {
            console.log(data);
        }
    })
}

loginCheck();