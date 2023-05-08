import './App.css';
import './styles/style.css'
import './styles/playlistsStyle.css'
import './styles/accountStyle.css'
import './styles/logres.css'
import './styles/playlistStyle.css'
import './styles/songsStyle.css'
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { StartingPage } from './pages/startingPage';
import { Register, Login } from './pages/logres'
import { UserPrivatePlaylists, UserPublicPlaylists } from './pages/userPlaylists';
import { UserAccount } from './pages/userAccount';
import { Playlist } from './pages/playlist';
import React from 'react';

function App() {
  return (
    <>
    <nav>
      <input type="checkbox" id="menu-toggle"></input>
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      <ul id="menu">
        <li><Link to="/"><b>Home</b></Link></li>
        <li><Link to="/userPublicPlaylists">Your public playlists</Link></li>
        <li><Link to="/userPrivatePlaylists">Your private playlists</Link></li>
        <li><Link to="/userAccount">Your account</Link></li>
      </ul>
    </nav>
    <Routes>
        <Route exact path="/" element={ <StartingPage/> }/>
        <Route path="/userPublicPlaylists" element={ <UserPublicPlaylists/> }/>
        <Route path="/userPrivatePlaylists" element={ <UserPrivatePlaylists/> }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/userAccount" element={ <UserAccount/> }/>
        <Route path="/playlist/:plId" element={ <Playlist/> }/>
    </Routes>
    
    <footer>
        <div>
            <h4>© All rights reserved</h4>
        </div>
        <div>
            <h4>Number: 111-111-1111</h4>
            <h4>Email: template@gmail.com</h4>
        </div>
    </footer>
    </>
    )
}

export default App;
