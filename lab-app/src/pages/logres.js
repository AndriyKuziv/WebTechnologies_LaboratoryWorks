import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

export class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }    

    onSubmit(e){
        e.preventDefault();

        const { navigate } = this.props;
        
        var username = this.username.value;
        var password = this.password.value;

        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
          }).then(response => {
            if (response.ok) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                return response.json();
            }
            
            else if (response.status === 401) {
                alert("Wrong username or password");
                return;
            }
            
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
            navigate("/");
        })
        .catch(error => console.error(error));
    }

    render(){
        return (
            <div id="logres-container">
            <form className="logres-form" action="#" method="POST">
                <h1>Log in</h1>
                <input type="text" id="username" name="username" placeholder="Username" required ref={(c) => this.username = c}></input>
                <input type="password" id="password" name="password" placeholder="Password" required ref={(c) => this.password = c}></input>
                <input type="submit" value="Login" id="login" onClick={this.onSubmit}></input>
                <Link to="/register"><h4>Don't have an account? Create one!</h4></Link>
            </form>
            </div>
        );
    }
}

export function Login(props) {
    const navigate = useNavigate();
  
    return <LoginPage {...props} navigate={navigate} />;
}

export class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        const { navigation } = this.props;

        var username = this.username.value;
        var email = this.email.value;
        var password = this.password.value;
        var confpassword = this.confpassword.value;

        // if (password !== confpassword){
        //     alert("Write your password correctly");
        //     return;
        // }

        let body = JSON.stringify({username: username, email:email, password: password});

        console.log(body);
    
        let url = 'http://localhost:5000/user/create';

        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigation("/");
        })
        .catch(error => {
            console.error(error);
        });
    }

    render(){
        return (
            <div id="logres-container">
                <form className="logres-form" action="#" method="POST">
                    <h1>Register</h1>
                    <input type="text" id="username" name="username" placeholder="Username" required ref={(c) => this.username = c}></input>
                    <input type="text" id="email" name="email" placeholder="Email" required ref={(c) => this.email = c}></input>
                    <input type="password" id="password" name="password" placeholder="Password" required ref={(c) => this.password = c}></input>
                    <input type="password" id="conf-password" name="password" placeholder="Confirm password" required ref={(c) => this.confpassword = c}></input>
                    <input type="submit" value="Register" id="register" onClick={this.onSubmit}></input>
                    <Link to="/login"><h4>Already have an account?</h4></Link>
                </form>
            </div>
        );
    };
}

export function Register(props){
    const navigation = useNavigate();
  
    return <RegisterPage {...props} navigation={navigation} />;
}
