import { render, screen, waitFor } from '@testing-library/react';
import mockFetch from "../mocks/mockFetch";
import { BrowserRouter } from 'react-router-dom';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import App from '../App';

import { StartingPage } from "../pages/startingPage";

beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
 })

afterEach(() => {
    jest.restoreAllMocks()
 });

test('renders the landing page', () => {
    render(
        <StartingPage/>
    );

    waitFor(()=>{
        expect(screen.findByTestId(30)).not.ToBeInTheDocument()
    })
});