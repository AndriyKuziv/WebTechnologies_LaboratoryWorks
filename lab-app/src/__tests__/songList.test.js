import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';
import { SongsToAdd, SongsToDelete, AddSong  } from '../pages/songList';
import React from "react";
import {expect, jest, test} from '@jest/globals';


describe('SongsToAdd', () => {
  let originalFetch;

  beforeEach(async ()=>{
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, name: 'Song 1', artist: 'Artist 1' },
                { id: 2, name: 'Song 2', artist: 'Artist 2' },
            ]),
        })
    );
  });
  
  afterEach(async () => {
    global.fetch = originalFetch;
  });


  it('renders the functional songs` buttons', async () => {
    
    render(
        <MemoryRouter initialEntries={["/playlist/1/addSong"]}>
            <Routes>
            <Route path="/playlist/:plId/addSong" element={<SongsToAdd/>}/>
            </Routes>
        </MemoryRouter>
    )

    expect(await screen.findByText("Song 1")).toBeInTheDocument();
    expect(await screen.findByText("Artist 1")).toBeInTheDocument();
    expect(await screen.findByText("Song 2")).toBeInTheDocument();
    expect(await screen.findByText("Artist 2")).toBeInTheDocument();
    expect(await screen.findByTestId('1')).toBeInTheDocument();
    


    fireEvent.click(screen.getByTestId('1'));
    expect(1).toEqual(1);
  });

  it('renders the basic component', async () => {
    
    render(
        <MemoryRouter initialEntries={["/playlist/1/addSong"]}>
            <Routes>
            <Route path="/playlist/:plId/addSong" element={<SongsToAdd/>}/>
            </Routes>
        </MemoryRouter>
    )

    expect(await screen.findByTestId("lbl")).toBeInTheDocument();
    expect(await screen.findByTestId("sngs")).toBeInTheDocument();
    expect(await screen.findByTestId("cntnr")).toBeInTheDocument();
    expect(await screen.findByTestId("sngls")).toBeInTheDocument();
  });

  
});

describe('SongsToDelete', () => {
  let originalFetch;

  beforeEach(async ()=>{
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, name: 'Song 1', artist: 'Artist 1' },
                { id: 2, name: 'Song 2', artist: 'Artist 2' },
            ]),
        })
    );
  });
  
  afterEach(async () => {
    global.fetch = originalFetch;
  });

  it('renders the functional songs` buttons', async () => {
    
    render(
        <MemoryRouter initialEntries={["/playlist/1/deleteSong"]}>
            <Routes>
            <Route path="/playlist/:plId/deleteSong" element={<SongsToDelete/>}/>
            </Routes>
        </MemoryRouter>
    )

    expect(await screen.findByText("Song 1")).toBeInTheDocument();
    expect(await screen.findByText("Artist 1")).toBeInTheDocument();
    expect(await screen.findByText("Song 2")).toBeInTheDocument();
    expect(await screen.findByText("Artist 2")).toBeInTheDocument();
    expect(await screen.findByTestId('1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('1'));
  });
});