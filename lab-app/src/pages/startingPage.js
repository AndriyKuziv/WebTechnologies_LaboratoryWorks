import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';

export function StartingPage(){
    // var res = await getPlaylists();

    // console.log(res[0]);
    
    //console.log();

    return <>
        {/* <div className="playlists">
        <div className="label"><h1>Public playlists</h1></div>
            <div className="container">
                {res.map(item => <div className="playlist-button" onClick="window.location='pages/playlist.html';" key={item.id}>
                            <h2 className="playlist-name">{item.name}</h2>
                            <h4 className="playlist-creator">Creator: {item.user_name}</h4>
                        </div>
                    
                )}
            </div>
        </div> */}
    </>;
}

async function getPlaylists(){    
    const list = await fetch('http://localhost:5000/playlist')
    .then(response => response.json())
    .then(data => {
        return data;
        // data.forEach(element => {
        //     const playlist = (
        //         <>
                // <div className="playlist-button" onClick="window.location='pages/playlist.html';">
                //     <h2 className="playlist-name">{element.name}</h2>
                //     <h4 className="playlist-creator">Creator: {element.user_name}</h4>
                // </div>
        //         </>
        //     );
            
        //     ps = playlist;
        //     //return playlist;

        //     // var pName = playlist.querySelector(".playlist-name");
        //     // var cName = playlist.querySelector(".playlist-creator");    
        //     // pName.innerHTML = element.name;
        //     // cName.innerHTML = "Creator: " + element.user_name;
            
        //     //playlist.id = element.id;

            
        //     //var playlistsContainer = document.querySelector(".container");
        //     //playlistsContainer.appendChild(playlist);

        //     // var p = document.getElementById(element.id);
        //     // p.setAttribute("onClick", "window.location='pages/playlist.html?id=" + element.id + "'");
            
        //     //console.log(p);
        // });
    })
    .catch(error => {
        console.log(error);
    });

    //console.log(ps);

    return list;
}