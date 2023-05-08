import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function Playlist(){

    let { plId } = useParams();

    let [pl, setPl] = useState(null);
    let [songs, setSongs] = useState(null);
    
    let url = "http://localhost:5000/playlist/" + plId;
    let urlSongs = "http://localhost:5000/playlist/" + plId + "/songs";

    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    //let encoded = btoa('newUser1:2341');
    
    let auth = 'Basic ' + encoded;
    
    h.append('Authorization', auth);
    
    let req = new Request(url, {
        method:'GET',
        headers:h,
        credentials:'same-origin'
    });

    let req2 = new Request(urlSongs, {
        method:'GET',
        headers:h,
        credentials:'same-origin'
    });

    useEffect(() => {
        fetch(req)
        .then(response => response.json())
        .then(data => setPl(data))
    }, []);

    useEffect(() => {
        fetch(req2)
        .then(response => response.json())
        .then(data => setSongs(data))
    }, []);

    return(
        <div id="playlist" key={pl && pl.id}>
            <h1 className="playlist-name">{pl && pl.name}</h1>
            <h2 className="playlist-creator">{pl && pl.user_name}</h2>
            <h3 className="playlist-type">Type: {pl && pl.state}</h3>
            <input type="button" value="Add song" id="add-button"></input>
            <input type="button" value="Delete song" id="delete-song"></input>
            <ul className="song-list">
                {
                    songs && songs.map((song) => {
                        return <>
                        <li className="song" key={song.id}>
                            <div className="song-container">
                                <h1 className="song-name">{song.name}</h1>
                                <h2 className="artist-name">{song.artist}</h2>
                            </div>
                        </li>
                        </>
                    })
                }
            </ul>
        </div>
    );
}