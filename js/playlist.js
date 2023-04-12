function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

console.log(id);

let urlPlaylist = "http://localhost:5000/playlist/" + id;
let urlPlaylistSongs = "http://localhost:5000/playlist/" + id + "/songs";

let h = new Headers();
h.append('Accept', 'application/json');
let encoded = btoa('newUser1:2341');

let auth = 'Basic ' + encoded;

h.append('Authorization', auth);
console.log(auth);

let req = new Request(urlPlaylist, {
    method:'GET',
    headers:h,
    credentials:'same-origin'
});
fetch(req)
    .then(response => response.json())
    .then(data => {
        
        var playlist = document.querySelector("#playlist");

        var pName = playlist.querySelector(".playlist-name");
        var cName = playlist.querySelector(".playlist-creator");
        var tName = playlist.querySelector(".playlist-type");

        pName.innerHTML = data.name;
        cName.innerHTML = data.user_name;
        tName.innerHTML = data.state;
        
        var addBttn = playlist.querySelector("#add-button");
        addBttn.setAttribute("onClick", "window.location='songs.html?id=" + id + "'");
    });

let req2 = new Request(urlPlaylistSongs, {
    method:'GET',
    headers:h,
    credentials:'same-origin'
});
fetch(req2)
    .then(response => response.json())
    .then(data => {
        data.forEach(element =>{
            const song = elementFromHtml(`
            <li class="song"><div class="song-container">
                <h1 class="song-name">First song</h1>
                <h2 class="artist-name">(Artist pseudonym)</h2>
            </div></li>
            `);

            var sName = song.querySelector(".song-name");
            var aName = song.querySelector(".artist-name");
    
            sName.innerHTML = element.name;
            aName.innerHTML = element.artist;

            var songlist = document.querySelector(".song-list");

            songlist.appendChild(song);
        })
    })