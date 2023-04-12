function elementFromHtml(html){
    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

fetch('http://localhost:5000/playlist')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const playlist = elementFromHtml(`
            <div class="playlist-button" onclick="window.location='pages/playlist.html';" style="cursor:pointer;">
                <h2 class="playlist-name">PublicPlaylistIgot</h2>
                <h4 class="playlist-creator">Creator: </h4>
            </div>
            `);
            var pName = playlist.querySelector(".playlist-name");
            var cName = playlist.querySelector(".playlist-creator");    
            pName.innerHTML = element.name;
            cName.innerHTML = "Creator: " + element.user_name;
            
            playlist.id = element.id;

            var playlistsContainer = document.querySelector(".container");
            playlistsContainer.appendChild(playlist);

            var p = document.getElementById(element.id);
            p.setAttribute("onClick", "window.location='pages/playlist.html?id=" + element.id + "'");
            
            console.log(p);
        });
    })
    .catch(error => {
        console.log(error);
    });