function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

let url = "";

let h = new Headers();
h.append('Accept', 'application/json');
let encoded = btoa('newUser1:2341');

let auth = 'Basic ' + encoded;

h.append('Authorization', auth);
console.log(auth);

let req = new Request(url, {
    method:'GET',
    headers:h,
    credentials:'same-origin'
});

var usrName = document.querySelector("#user-name");
usrName.innerHTML = "newUser1";
