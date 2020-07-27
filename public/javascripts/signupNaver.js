function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        { 
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

var queryList = window.location.href.split('?')[1].split('&');

var tempString = queryList[1].split('=')[1]
var nameArray = tempString.split("%");
var nameArray2 = [];
for (var i = 1; i < nameArray.length; i++)
    nameArray2[i-1] = parseInt(nameArray[i], 16);

const name = Utf8ArrayToStr(nameArray2);
const email = queryList[0].split('=')[1];

history.replaceState({}, null, location.pathname);

document.querySelector('#user_name').innerHTML = "이름: " + name;
document.querySelector('#user_email').innerHTML = "이메일: " + email;

document.querySelector('#signup_btn').addEventListener('click', (ev) => {
    const pw = document.querySelector('#pw').value;
    const pw_check = document.querySelector('#pw_check').value;

    if (pw != pw_check) {
        alert("Invalid password");
        return;
    }

    const user = {"email":email, "name":name, "password":pw};

    $.post("/signup", user, (data)=>{
        console.log(data);
    })
});