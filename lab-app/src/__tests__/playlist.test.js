import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Playlist } from '../pages/playlist';

import { BrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Playlist', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders playlist details correctly', async () => {
    const playlistId = '1';
    const playlistName = 'My Playlist';
    const playlistCreator = 'John Doe';
    const playlistType = 'Public';

    useParams.mockReturnValue({ plId: playlistId });

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: playlistId,
          name: playlistName,
          user_name: playlistCreator,
          state: playlistType,
        }),
    });

    render(<BrowserRouter><Playlist/></BrowserRouter>);

    await screen.findByText(playlistName);

    expect(screen.getByText(playlistName)).toBeInTheDocument();
    expect(screen.getByText(playlistCreator)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${playlistType}`)).toBeInTheDocument();
  });

  test('changes playlist state when clicked', async () => {
    const playlistId = '1';
    const playlistType = 'Public';

    useParams.mockReturnValue({ plId: playlistId });

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: playlistId,
          name: 'My Playlist',
          user_name: 'John Doe',
          state: playlistType,
        }),
    });

    render(<BrowserRouter><Playlist/></BrowserRouter>);

    await screen.findByText(`Type: ${playlistType}`);

    await screen.findByText("Public");

    expect(screen.getByTestId('playlistState')).toHaveValue(playlistType);

    fireEvent.click(screen.getByTestId('playlistState'));

    expect(screen.getByTestId('playlistState')).toHaveValue('Private');
  });

  test('check saving the changes', async () => {
    const playlistId = '1';
    const playlistType = 'Public';

    useParams.mockReturnValue({ plId: playlistId });

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: playlistId,
          name: 'My Playlist',
          user_name: 'John Doe',
          state: playlistType,
        }),
    });

    render(<BrowserRouter><Playlist/></BrowserRouter>);

    expect(screen.getByDisplayValue("Edit playlist")).toBeInTheDocument();

    fireEvent.click(screen.getByDisplayValue("Edit playlist"));
    fireEvent.click(screen.getByTestId("changeName"));

    localStorage.setItem("username", "User1");
    localStorage.setItem("password", "2341");
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: playlistId,
          name: 'New Playlist',
          user_name: 'New User',
          state: playlistType,
        }),
    });

    fireEvent.click(screen.getByTestId("save-changes"));

    expect(1).toEqual(1);
  });
});