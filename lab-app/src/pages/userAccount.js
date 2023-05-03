export function UserAccount(){
    return (
        <div id="user-account">
            <h1 id="user-name">(Username)</h1>
            <input type="button" value="Change username" id="change-username"></input>
            <input type="text" id="username" name="username" placeholder="Username"></input>

            <input type="button" value="Change email" id="change-email"></input>
            <input type="text" id="email" name="email" placeholder="Email"></input>

            <input type="button" value="Save changes" id="save"></input>

            <input type="button" value="Log out" id="logout"></input>
            <input type="button" value="Delete account" id="delete-account"></input>
        </div>
    );
}