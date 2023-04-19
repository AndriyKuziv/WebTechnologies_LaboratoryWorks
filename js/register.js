document.querySelector('#register').onclick = function(event){
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confPassword = document.getElementById('conf-password').value;

    if (password != confPassword){
        alert("Write your password correctly");
        window.location.href="register.html";
    }

    let body = JSON.stringify({username: username, email:email, password: password});

    console.log(body);

    let url = 'http://localhost:5000/user/create';

    postData(url, body)
    .then(response => {
        window.location.href = "login.html";
    });
}

async function postData(url="", data={}){
    const response = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:data
    })
    .catch(error => {
        console.error(error);
    });

    return response.json();
}