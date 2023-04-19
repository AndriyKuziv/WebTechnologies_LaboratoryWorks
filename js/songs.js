function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

if(localStorage.length == 0){
    alert("You do not have access to this page");
    window.location.href="login.html";
}


const urlParams = new URLSearchParams(window.location.search);
const playlistId = urlParams.get('id');

let url = "http://localhost:5000/song";

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
            const song = elementFromHtml(`
            <li class="song" style="cursor:pointer;><div class="song-container">
                <h1 class="song-name">First song</h1>
                <h2 class="artist-name">(Artist pseudonym)</h2>
            </div></li>
            `);
            var sName = song.querySelector(".song-name");
            var aName = song.querySelector(".artist-name");
    
            sName.innerHTML = element.name;
            aName.innerHTML = element.artist;

            song.id = element.id;

            var songlist = document.querySelector(".song-list");

            songlist.appendChild(song);

            var s = document.getElementById(element.id);
            s.setAttribute("onClick", "addSong(this)");
        });
    })
    .catch(error => {
        console.error(error);
    });

function addSong(obj){
    const songId = obj.id;
    console.log(songId);
    
    let addUrl = "http://localhost:5000/playlist/" + playlistId + "/addSong";

    let body = JSON.stringify({song_id: songId}); 

    postData(addUrl, body).then(data => {
        console.log(data);
    }).then(response => {
        window.location.href = "playlist.html?id=" + playlistId;
    });
}

async function postData(url="", data = {}){
    console.log(data);

    //let encoded = btoa('newUser1:2341');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    let auth = 'Basic ' + encoded;

    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: data
    })
    .catch(error=>{
        console.error(error);
    });

    return response.json();
}