import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteMovie from '../Admin/DeleteMovie';
import { BrowserRouter as Router } from "react-router-dom";


jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn())
}));

describe('DeleteMovie Component', () => {
    test('renders the Back button', () => {
        render(<DeleteMovie />);
        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
    });

    test('renders the correct number of movie cards', async () => {
        const mockMovieList = [
            {
                name: 'Movie 1',
                ticketStatus: 'BOOK ASAP',
                numberOfTickets: 10
            },
            {
                name: 'Movie 2',
                ticketStatus: 'SOLD OUT',
                numberOfTickets: 0
            }
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => mockMovieList
        });

        render(<DeleteMovie />);

        const movieCards = await screen.findAllByTestId(/movie-card-/);
        expect(movieCards).toHaveLength(mockMovieList.length);
    });



});
