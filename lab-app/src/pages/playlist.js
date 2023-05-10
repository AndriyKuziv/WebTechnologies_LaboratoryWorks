import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function Playlist(){
    const navigate = useNavigate();

    let { plId } = useParams();

    let [pl, setPl] = useState(null);
    let [songs, setSongs] = useState(null);

    let [visible, setVisible] = useState(false);
    let [visibleName, setVisibleName] = useState(false);
    let [plName, setPlName] = useState("");

    let [playlistState, setPlaylistState] = useState("Public");

    function changeVisibility(){
        if (visible){
            setVisible(false);
            setVisibleName(false);
        }
        else setVisible(true);
    }

    function changeName(){
        if (visibleName) setVisibleName(false);
        else setVisibleName(true);
    }

    function changeType(){
        if (playlistState == "Public") setPlaylistState("Private");
        else setPlaylistState("Public");
    }

    function saveChanges(){
        let url = "http://localhost:5000/playlist/" + plId;
        let encoded = btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
        let auth = 'Basic ' + encoded;
        let body = JSON.stringify({name: plName, state: playlistState});

        fetch(url, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': auth
            },
            body: body
        })
        .then(response => response.json())
        .then(data => window.location.reload())
        .catch(error => console.error(error));
    }
    
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
            .then(data => {
                setPl(data);
                setPlName(data.name);
                setPlaylistState(data.state);
            })
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
            
            <input type="button" value={!visible ? "Edit playlist" : "Cancel"} id="edit-button" onClick={changeVisibility} style={{backgroundColor: "rgb(204,102,0)"}}></input>
            <Link to={`/playlist/${plId}/addSong`} style={{ textDecoration: 'none' }} style={!visible ? {display: "none"} : {display: "inline-block", textDecoration: 'none'}}><input type="button" value="Add song" id="add-button"></input></Link>
            <Link to={`/playlist/${plId}/deleteSong`} style={{ textDecoration: 'none' }} style={!visible ? {display: "none"} : {display: "inline-block",textDecoration: 'none'}}><input type="button" value="Delete song" id="delete-song" style={{backgroundColor: "rgb(122, 20, 20)"}}></input></Link>
            
            <input type="button" id="playlistState" value={playlistState} style={!visible ? {display:"none"} : {display:"flex", backgroundColor: "rgb(0,142,142)"}} onClick={changeType}></input>
            <input type="button" value="Change name" id="change-username" onClick={changeName} style={!visible ? {display: "none"} : {display: "flex", textDecoration: 'none'}}></input>
            <input type="text" id="playlistName" name="playlistName" placeholder="Playlist Name" value={plName} onChange={e => setPlName(e.target.value)} style={!visibleName ? {display: "none"} : {display: "flex", textDecoration: 'none'}}></input>
            <input type="button" value="Save changes" id="save-changes" onClick={saveChanges} style={!visible ? {display: "none"} : {display: "flex", backgroundColor: "rgb(204,102,0)"}}></input>

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