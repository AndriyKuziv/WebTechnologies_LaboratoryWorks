import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function UserAccount(){
    const navigate = useNavigate();
    const [usernameF, setUsernameF] = useState(localStorage.getItem('username'));
    const [emailF, setEmailF] = useState(localStorage.getItem('email'));

    useEffect(() => {
        if (localStorage.length <= 0){
            navigate("/login");
            return;  
        }
    });

    function LogOut(){
        localStorage.clear();
        console.log("done");
        navigate("/");
    }
    
    function ShowUsername(){
        let usernameField = document.querySelector("#username");
        if(usernameField.style.display == "none"){
            usernameField.setAttribute("style", "display:block;");
        }
        else{
            usernameField.setAttribute("style", "display:none;");
        }
    }

    function ShowEmail(){
        let emailField = document.querySelector("#email");
        if(emailField.style.display == "none"){
            emailField.setAttribute("style", "display:block;");
        }
        else{
            emailField.setAttribute("style", "display:none;");
        }
    }

    function SaveChanges(){
        let url = "http://localhost:5000/user/" + localStorage.getItem('id');
        let body = JSON.stringify({username: usernameF, email: emailF});

        fetch(url, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))
            },
            body: body
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            var usrnm = document.querySelector("#user-name");
            usrnm.innerHTML = localStorage.getItem('username')
            console.log(localStorage);
        }).catch(error => console.error(error));
    }

    return (
        <div id="user-account">
            <h1 id="user-name">{localStorage.getItem('username')}</h1>
            <input type="button" value="Change username" id="change-username" onClick={ShowUsername}></input>
            <input type="text" id="username" name="username" placeholder="Username" value={usernameF} onChange={e => setUsernameF(e.target.value)} style={{display:"none"}}></input>

            <input type="button" value="Change email" id="change-email" onClick={ShowEmail}></input>
            <input type="text" id="email" name="email" placeholder="Email" value={emailF} onChange={e => setEmailF(e.target.value)} style={{display:"none"}}></input>

            <input type="button" value="Save changes" id="save" onClick={SaveChanges}></input>

            <input type="button" value="Log out" id="logout" onClick={LogOut}></input>
            {/* <input type="button" value="Delete account" id="delete-account"></input> */}
        </div>
    );
}

