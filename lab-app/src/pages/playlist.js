import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function Playlist(){
    const navigate = useNavigate();

    let { plId } = useParams();

    let [pl, setPl] = useState(null);
    let [songs, setSongs] = useState(null);
    
    let url = "http://localhost:5000/playlist/" + plId;
    let urlSongs = "http://localhost:5000/playlist/" + plId + "/songs";

    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    
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
        if (localStorage.length > 0){
            fetch(req)
            .then(response => response.json())
            .then(data => setPl(data))
        }
        else{
            alert("You have no access");
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (localStorage.length > 0){
            fetch(req2)
            .then(response => response.json())
            .then(data => setSongs(data))
        }
    }, []);

    return(
        <div id="playlist" key={pl && pl.id}>
            <h1 className="playlist-name">{pl && pl.name}</h1>
            <h2 className="playlist-creator">{pl && pl.user_name}</h2>
            <h3 className="playlist-type">Type: {pl && pl.state}</h3>
            <Link to={`/playlist/${plId}/addSong`}><input type="button" value="Add song" id="add-button"></input></Link>
            <Link to={`/playlist/${plId}/deleteSong`}><input type="button" value="Delete song" id="delete-song"></input></Link>
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