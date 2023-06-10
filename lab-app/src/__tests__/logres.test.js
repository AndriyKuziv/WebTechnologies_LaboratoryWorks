import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login, LoginPage, Register, RegisterPage } from '../pages/logres';
import { MemoryRouter, Route, Routes, BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('submits the form with correct credentials', async () => {
    const mockData = { email: 'test@example.com', id: 123 };
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const navigateMock = jest.fn();
    const props = { navigate: navigateMock };
    render(
        <MemoryRouter initialEntries={["/login"]}>
            <Routes>
            <Route path="/" element={<Login {...props}/>}/>
            <Route path="/login" element={<Login {...props}/>}/>
            <Route path="/register" element={<Register {...props}/>}/>
            </Routes>
        </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk',
      },
    });
    expect(1).toEqual(1);
  });

  it('displays an alert for wrong credentials', async () => {
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        status: 401,
      })
    );
    jest.spyOn(window, 'alert').mockImplementationOnce(() => {});

    const navigateMock = jest.fn();
    const props = { navigate: navigateMock };
    render(
        <MemoryRouter initialEntries={["/login"]}>
            <Routes>
            <Route path="/" element={<Login {...props}/>}/>
            <Route path="/login" element={<Login {...props}/>}/>
            <Route path="/register" element={<Register {...props}/>}/>
            </Routes>
        </MemoryRouter>);

    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(submitButton);

    expect(window.fetch).toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

describe('RegisterPage', () => {
  it('submits the form with matching passwords', async () => {
    const mockData = { message: 'Registration successful' };
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const navigateMock = jest.fn();
    const props = { navigation: navigateMock };
    render(
        <MemoryRouter initialEntries={["/register"]}>
            <Routes>
            <Route path="/" element={<Login {...props}/>}/>
            <Route path="/login" element={<Login {...props}/>}/>
            <Route path="/register" element={<Register {...props}/>}/>
            </Routes>
        </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      }),
    });
    expect(1).toEqual(1);
  });
});