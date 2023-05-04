import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';

export function StartingPage(){
    let [pls, setPls] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/playlist')
        .then(response => response.json())
        .then(data => setPls(data))
        .catch(error => console.log(error))
    }, []);

    //console.log(pls);

    return <>
        <div className="playlists">
        <div className="label"><h1>Public playlists</h1></div>
            <div className="container">
                {pls && pls.map((pl) => {
                    return <>
                    <Link to={`/playlist/${pl.id}`}> 
                    <div className="playlist-button" key={pl.id}>
                        <h2 className="playlist-name">{pl.name}</h2>
                        <h4 className="playlist-creator">Creator: {pl.user_name}</h4>
                    </div>
                    </Link>
                    </>
                }
                )
                }
            </div>
        </div>
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