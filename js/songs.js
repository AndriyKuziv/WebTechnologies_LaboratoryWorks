function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let url = "http://localhost:5000/song";

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
            s.setAttribute("onClick", "addSong()");
            
            console.log(s);
        });
    })
    .catch(error => {
        console.log(error);
    });

function addSong(){
    var songId = this.id;
    
    let addUrl = "http://localhost:5000/playlist/" + id + "/addSong";

    let body = JSON.stringify({song_id: songId}); 

    postData(addUrl, {"song_id": 8});

    // fetch(addReq)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         alert(data);
    //     })
    //     .catch(error => console.log(error));
    
    //window.location='playlist.html?id=' + id;
}

async function postData(url="", data = {}){
    let addH = new Headers();
    addH.append('Accept', 'application/json');
    let encoded = btoa('newUser1:2341');
    let auth = 'Basic ' + encoded;
    addH.append('Authorization', auth);

    // let addReq = new Request(url, {
    //     method:'POST',
    //     headers:addH,
    //     body: data,
    //     credentials:'same-origin'
    // });

    await fetch(url, {
        method:"POST",
        credentials: "same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
        headers:addH
    })
    .then(response => console.log(response.json()));
}