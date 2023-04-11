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
                <h4 class="playlist-creator">Creator: (Creator)</h4>
            </div>
            `);
            var pName = playlist.querySelector(".playlist-name");
            var cName = playlist.querySelector(".playlist-creator");    
            pName.innerHTML = element.name;
            cName.innerHTML = element.user_name;

            console.log(pName);
            console.log(cName);

            var playlistsContainer = document.querySelector(".container");
            playlistsContainer.appendChild(playlist);
        });
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })