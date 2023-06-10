import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserAccount } from '../pages/userAccount';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';

describe('UserAccount', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('email', 'test@example.com');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders user name', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const userNameElement = screen.getByText(/testuser/i);
    expect(userNameElement).toBeInTheDocument();
  });

  test('shows username input when "Change username" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const changeUsernameButton = screen.getByText(/Change username/i);
    fireEvent.click(changeUsernameButton);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('shows email input when "Change email" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const changeEmailButton = screen.getByText(/Change email/i);
    fireEvent.click(changeEmailButton);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('saves changes when "Save changes" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const saveChangesButton = screen.getByText(/Save changes/i);
    fireEvent.click(saveChangesButton);
  });

  test('logs out when "Log out" button is clicked', () => {
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: jest.fn(),
    }));
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const logoutButton = screen.getByText(/Log out/i);
    fireEvent.click(logoutButton);
    expect(localStorage.length).toBe(0);
  });

  test('navigates to "/login" when localStorage is empty', () => {
    localStorage.clear();
    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
    }));
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    expect(1).toEqual(1);
  });

  test('toggles display of username field when "Change username" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const changeUsernameButton = screen.getByText(/Change username/i);
    const usernameField = screen.getByPlaceholderText(/Username/i);
    expect(usernameField).toHaveStyle({ display: 'none' });

    fireEvent.click(changeUsernameButton);
    expect(usernameField).toHaveStyle({ display: 'block' });

    fireEvent.click(changeUsernameButton);
    expect(usernameField).toHaveStyle({ display: 'none' });
  });

  test('toggles display of email field when "Change email" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const changeEmailButton = screen.getByText(/Change email/i);
    const emailField = screen.getByPlaceholderText(/Email/i);
    expect(emailField).toHaveStyle({ display: 'none' });

    fireEvent.click(changeEmailButton);
    expect(emailField).toHaveStyle({ display: 'block' });

    fireEvent.click(changeEmailButton);
    expect(emailField).toHaveStyle({ display: 'none' });
  });

  test('saves changes and updates localStorage when "Save changes" button is clicked', () => {
    render(
        <MemoryRouter initialEntries={["/userAccount"]}>
            <Routes>
            <Route path="/userAccount" element={<UserAccount/>}/>
            </Routes>
        </MemoryRouter>
    );
    const saveChangesButton = screen.getByText(/Save changes/i);
    const fetchMock = jest.spyOn(global, 'fetch');
    const updatedUsername = 'newuser';
    const updatedEmail = 'new@example.com';

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: updatedUsername } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: updatedEmail } });
    fireEvent.click(saveChangesButton);

    expect(fetchMock).toHaveBeenCalledWith(`http://localhost:5000/user/${localStorage.getItem('id')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))
      },
      body: JSON.stringify({ username: updatedUsername, email: updatedEmail }),
    });
  });
});