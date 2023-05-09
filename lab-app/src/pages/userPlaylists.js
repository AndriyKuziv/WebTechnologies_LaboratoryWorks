import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function UserPrivatePlaylists(){

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.length <= 0){
            alert("You do not have access");
            navigate("/login");
            return;
        }
    });

    let url = "http://localhost:5000/playlist/user/private";

    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    //let encoded = btoa('User1:2341');
    
    let auth = 'Basic ' + encoded;
    
    h.append('Authorization', auth);
    
    let req = new Request(url, {
        method:'GET',
        headers:h,
        credentials:'same-origin'
    });

    let [pls, setPls] = useState(null);

    useEffect(() => {
        if (localStorage.length > 0){
            fetch(req)
            .then(response => response.json())
            .then(data => setPls(data))
        }
    }, []);

    return (
        <div className="playlists">
            <div className="label"><h1>Your private playlists</h1></div>
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
                )}
            </div>
        </div>
    );
}

export function UserPublicPlaylists(){

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.length <= 0){
            alert("You do not have access");
            navigate("/login");
            return;   
        }
    });

    let url = "http://localhost:5000/playlist/user/public";

    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    //let encoded = btoa('User1:2341');
    
    let auth = 'Basic ' + encoded;
    
    h.append('Authorization', auth);
    
    let req = new Request(url, {
        method:'GET',
        headers:h,
        credentials:'same-origin'
    });

    let [pls, setPls] = useState(null);

    useEffect(() => {
        if (localStorage.length > 0){
            fetch(req)
            .then(response => response.json())
            .then(data => setPls(data))
        }
    }, []);

    return (
        <div className="playlists">
            <div className="label"><h1>Your public playlists</h1></div>
            <div className="container">
                {pls && pls.map((pl) => 
                <Link to={`/playlist/${pl.id}`}> 
                <div className="playlist-button" key={pl.id}>
                    <h2 className="playlist-name">{pl.name}</h2>
                    <h4 className="playlist-creator">Creator: {pl.user_name}</h4>
                </div>
                </Link>
                )}
            </div>
        </div>
    );
}