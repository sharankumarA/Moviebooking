import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieListPage from '../Pages/MovieList';
import { BrowserRouter as Router } from "react-router-dom";

describe('MovieListPage Component', () => {
    test('renders search input and button', () => {
        render(<Router><MovieListPage /></Router>);
        const searchInput = screen.getByPlaceholderText('search');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    test('clicking "List All Movies" button shows all movies', async () => {
        const mockMovieList = [
            {
                name: 'Movie 1',
                ticketStatus: 'BOOK ASAP',
            },
            {
                name: 'Movie 2',
                ticketStatus: 'SOLD OUT',
            },
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => mockMovieList,
        });

        render(<Router><MovieListPage /></Router>);

        const listAllMoviesButton = screen.getByRole('button', { name: 'List All Movies' });
        fireEvent.click(listAllMoviesButton);

        const allMovieCards = await screen.findAllByText(/BOOK TICKETS/);
        expect(allMovieCards).toHaveLength(2); // Both movies are displayed
    });

    test('renders movie cards for all movies', async () => {
        const mockMovieList = [
            {
                name: 'Movie 1',
                ticketStatus: 'BOOK ASAP',
            },
            {
                name: 'Movie 2',
                ticketStatus: 'SOLD OUT',
            },
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => mockMovieList,
        });

        render(<Router><MovieListPage /></Router>);

        const movieCards = await screen.findAllByText(/BOOK TICKETS/);
        expect(movieCards).toHaveLength(2);
    });

});