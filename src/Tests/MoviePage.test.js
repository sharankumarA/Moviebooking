import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from "react-router-dom";
import MoviePage from '../Admin/MoviePage';


describe('MoviePage', () => {
    test('renders movie dropdown and displays tickets booked and available', async () => {
        render(<Router><MoviePage /></Router>);

        const name = screen.getByText('Tickets Booked');
        const Availabelname = screen.getByText('Tickets Available');

        expect(name).toBeInTheDocument();
        expect(Availabelname).toBeInTheDocument();
    });
});
