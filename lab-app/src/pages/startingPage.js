import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';

export function StartingPage(){
    let [pls, setPls] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/playlist')
        .then(response => response.json())
        .then(data => {setPls(data); console.log(data)})
    }, []);

    return <>
        <div className="playlists">
        <div className="label"><h1>Public playlists</h1></div>
            <div className="container" data-testid="test">
                {pls && pls.map((pl) => {
                    return <>
                    <Link to={`/playlist/${pl.id}`}> 
                    <div className="playlist-button" key={pl.id} data-testid={pl.id}>
                        <h2 className="playlist-name">{pl.name.length < 14 ? pl.name : pl.name.slice(0, 13) + "..."}</h2>
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