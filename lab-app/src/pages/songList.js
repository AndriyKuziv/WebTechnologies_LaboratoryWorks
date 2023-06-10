import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function SongsList(){
    const navigate = useNavigate();

    let [sngName, setSngName] = useState("");
    let [sngArt, setSngArt] = useState("");
    let [deleteMode, setDeleteMode] = useState(false);
    let [visible, setVisibility] = useState(false);

    function changeVisibility(){
        if (visible) setVisibility(false);
        else setVisibility(true);
    }

    function changeMode(){
        if(deleteMode == false)setDeleteMode(true);
        else setDeleteMode(false);
    }

    function CreateSong(){
        let createUrl = "http://localhost:5000/song/create";
        let body = JSON.stringify({ name: sngName, artist: sngArt });
    
        let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
        let auth = 'Basic ' + encoded;
    
        fetch(createUrl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: body
        })
        .then(response => window.location.reload())
        .catch(error=>console.error(error));
    }

    function DeleteSong(id){
        let url = "http://localhost:5000/song/" + id;
    
        let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
        let auth = 'Basic ' + encoded;
    
        fetch(url, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        })
        .then(response => response.json())
        .then(data => window.location.reload())
        .catch(error => console.error(error))
    }

    let [songList, setSongList] = useState(null);

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
            .then(data => setSongList(data))
        }
        else{
            alert("You have no access");
            navigate("/login");
        }
    }, []);

    return(
        <div className="songs" data-testid="sngs">
        <div className="label" data-testid="lbl"><h1>List of Songs</h1></div>
            <input type="button" value="Add song" id="add-button" onClick={changeVisibility} style={{display:"inline-block"}}></input>
            <input type="text" id="songName" name="songName" placeholder="Song Name" value={sngName} 
                onChange={e => setSngName(e.target.value)} style={!visible ? {display:"none"} : {display: "inline-block"}}></input>
            <input type="text" id="songArtist" name="songArtist" placeholder="Song Artist" value={sngArt} 
                onChange={e => setSngArt(e.target.value)} style={!visible ? {display:"none"} : {display: "inline-block"}}></input>
            <input type="button" id="confirmButton" value="Confirm" 
                style={!visible ? {display:"none"} : {display: "inline-block"}} onClick={CreateSong}></input>
            <input type="button" value={!deleteMode ? "Delete song" : "Cancel"} id="delete-button" onClick={changeMode} 
                style={{display:"inline-block", backgroundColor: "rgb(122, 20, 20)"}}></input>
            <div className="container" data-testid="cntnr">
                <ul className="song-list" data-testid="sngls">
                    {
                        songList && songList.map((song) => {
                            if (!deleteMode){
                                return <>
                                <li className="song" key={song.id} data-testid={song.id}>
                                    <div className="song-container">
                                        <h1 className="song-name">{song.name}</h1>
                                        <h2 className="artist-name">{song.artist}</h2>
                                    </div>
                                </li>
                                </>
                            }
                            else{
                                return <>
                                <li className="song-to-delete" key={song.id} data-testid={song.id} style={{cursor: "pointer"}} 
                                    onClick={e => DeleteSong(song.id)}>
                                    <div className="song-container">
                                        <h1 className="song-name">{song.name}</h1>
                                        <h2 className="artist-name">{song.artist}</h2>
                                    </div>
                                </li>
                                </>
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export function SongsToAdd(){
    const navigate = useNavigate();
    let { plId } = useParams();

    let [songList, setLongList] = useState(null);

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
        <div className="songs" data-testid="sngs">
        <div className="label" data-testid="lbl"><h1>Available songs</h1></div>
            <div className="container" data-testid="cntnr">
                <ul className="song-list" data-testid="sngls">
                    {
                        songList && songList.map((song) => {
                            return <>
                            <li className="song" style={{cursor: "pointer"}} key={song.id} data-testid={song.id} onClick={e => AddSong(song.id)}>
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
                            <li className="song" style={{cursor: "pointer"}} key={song.id} data-testid={song.id} onClick={e => DeleteSong(song.id)}>
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