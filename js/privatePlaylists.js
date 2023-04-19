function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

if(localStorage.length == 0){
    alert("You do not have access to this page");
    window.location.href="login.html";
}

let url = "http://localhost:5000/playlist/user/private";

let h = new Headers();
h.append('Accept', 'application/json');
let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
// let encoded = btoa('newUser1:2341');

let auth = 'Basic ' + encoded;

h.append('Authorization', auth);
console.log(auth);

let req = new Request(url, {
    method:'GET',
    headers:h,
    credentials:'same-origin'
});
fetch(req)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const playlist = elementFromHtml(`
            <div class="playlist-button" onclick="window.location='playlist.html';" style="cursor:pointer;">
                <h2 class="playlist-name">PrivatePlaylist1</h2>
            </div>
            `);
            var pName = playlist.querySelector(".playlist-name"); 
            pName.innerHTML = element.name;

            playlist.id = element.id;

            console.log(pName);

            var playlistsContainer = document.querySelector(".container");
            playlistsContainer.appendChild(playlist);

            var p = document.getElementById(element.id);
            p.setAttribute("onClick", "window.location='../pages/playlist.html?id=" + element.id + "'");
        });
        console.log(data);
    });
