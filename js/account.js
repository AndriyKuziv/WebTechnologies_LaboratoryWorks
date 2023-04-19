function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}


if(localStorage.length == 0){
    // alert("You do not have access to this page");
    window.location.href="login.html";
}

console.log(localStorage);
var usrName = document.querySelector("#user-name");
usrName.innerHTML = localStorage.getItem('username');

var chEmail = document.getElementById("email");
var chUsername = document.getElementById("username");

chEmail.style.display = "none";
chUsername.style.display = "none";
chEmail.value = localStorage.getItem('email');
chUsername.value = localStorage.getItem('username');

document.querySelector('#logout').onclick = function(event){
    localStorage.clear();
    window.location.href = "../index.html";
}

document.querySelector('#change-email').onclick = function(event){
    event.preventDefault();
    
    if(chEmail.style.display == "none"){
        chEmail.setAttribute("style", "display:block;");
    }
    else{
        chEmail.setAttribute("style", "display:none;");
    }
}

document.querySelector('#change-username').onclick = function(event){
    event.preventDefault();
    
    if(chUsername.style.display == "none"){
        chUsername.setAttribute("style", "display:block;");
    }
    else{
        chUsername.setAttribute("style", "display:none;");
    }
}

document.querySelector('#save').onclick = function(event){
    event.preventDefault();

    console.log(localStorage);

    let url = "http://localhost:5000/user/" + localStorage.getItem('id');

    let body = JSON.stringify({username: chUsername.value, email: chEmail.value});

    putData(url, body).then(res => {
        usrName.innerHTML = chUsername.value;
    });//.then(res => window.location.href='userAccount.html');
}

async function putData(url="", data={}){
    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
    }).catch(error => console.error(error));

    return response.json();
}


// let h = new Headers();
// h.append('Accept', 'application/json');
// let encoded = btoa('newUser1:2341');

// let auth = 'Basic ' + encoded;

// h.append('Authorization', auth);
// console.log(auth);

// let req = new Request(url, {
//     method:'GET',
//     headers:h,
//     credentials:'same-origin'
// });

// var usrName = document.querySelector("#user-name");
// usrName.innerHTML = "newUser1";
