import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function SongsToAdd(){
    const navigate = useNavigate();

    let { plId } = useParams();

    function AddSong(songId){
        let addUrl = "http://localhost:5000/playlist/" + plId + "/addSong";
        let body = JSON.stringify({ song_id: songId });

        let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
        let auth = 'Basic ' + encoded;
    
        fetch(addUrl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: body
        })
        .then(response => navigate("/playlist/" + plId))
        .catch(error=>{
            console.error(error);
        });
    }

    let [songList, setLongList] = useState(null);

    let url = "http://localhost:5000/song";

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

    useEffect(() => {
        if (localStorage.length > 0){
            fetch(req)
            .then(response => response.json())
            .then(data => setLongList(data))
        }
        else{
            alert("You have no access");
            navigate("/login");
        }
    }, []);

    return(
        <div className="songs">
        <div className="label"><h1>Available songs</h1></div>
            <div className="container">
                <ul className="song-list">
                    {
                        songList && songList.map((song) => {
                            return <>
                            <li className="song" style={{cursor: "pointer"}} key={song.id} onClick={e => AddSong(song.id)}>
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
        </div>
    );
}

export function SongsToDelete(){
    const navigate = useNavigate();

    let { plId } = useParams();
    let [songs, setSongs] = useState(null);

    let h = new Headers();
    h.append('Accept', 'application/json');
    let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
    
    let auth = 'Basic ' + encoded;
    
    h.append('Authorization', auth);

    function DeleteSong(songId){
        let urlDelete = "http://localhost:5000/playlist/" + plId + "/remSong/" + songId;
        let reqDelete = new Request(urlDelete, {
            method:'DELETE',
            headers:h,
            credentials:'same-origin'
        });

        fetch(reqDelete)
        .then(response => navigate("/playlist/" + plId))
        .catch(error => {
            console.error(error);
        });
    }

    let urlSongs = "http://localhost:5000/playlist/" + plId + "/songs";
    
    let req = new Request(urlSongs, {
        method:'GET',
        headers:h,
        credentials:'same-origin'
    });

    useEffect(() => {
        fetch(req)
        .then(response => response.json())
        .then(data => setSongs(data))
        .catch(error => console.error(error))
    }, []);

    return(
        <div className="songs">
        <div className="label"><h1>Which song do you want to delete?</h1></div>
            <div className="container">
                <ul className="song-list">
                    {
                        songs && songs.map((song) => {
                            return <>
                            <li className="song" style={{cursor: "pointer"}} key={song.id} onClick={e => DeleteSong(song.id)}>
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
        </div>
    );
}