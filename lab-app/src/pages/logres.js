import { Link } from 'react-router-dom';

export function Login(){
    return (
        <div id="logres-container">
            <form className="logres-form" action="#" method="POST">
                <h1>Log in</h1>
                <input type="text" id="username" name="username" placeholder="Username" required></input>
                <input type="password" id="password" name="password" placeholder="Password" required></input>
                <input type="submit" value="Login" id="login"></input>
                <Link to="/register"><h4>Don't have an account? Create one!</h4></Link>
            </form>
        </div>
    );
}

export function Register(){
    return (
        <div id="logres-container">
            <form className="logres-form" action="#" method="POST">
                <h1>Register</h1>
                <input type="text" id="username" name="username" placeholder="Username" required></input>
                <input type="text" id="email" name="email" placeholder="Email" required></input>
                <input type="password" id="password" name="password" placeholder="Password" required></input>
                <input type="password" id="conf-password" name="password" placeholder="Confirm password" required></input>
                <input type="submit" value="Register" id="register"></input>
            </form>
        </div>
    );
}