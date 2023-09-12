import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Needed for useNavigate
import BookTickets from '../Pages/BookTickets';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('BookTickets Component', () => {
    test('renders the "Book your tickets here!" heading', () => {
        render(<BookTickets movieName="Movie 1" />, { wrapper: BrowserRouter });
        const heading = screen.getByText('Book your tickets here!');

        expect(heading).toBeInTheDocument();
    });

    test('displays selected theater, seat count, and username', async () => {
        const mockTheaterNames = ['Theatre A'];

        jest.spyOn(global, 'fetch')
            .mockResolvedValueOnce({ json: async () => mockTheaterNames })
            .mockResolvedValueOnce({ json: async () => 10 }) // Ticket count
            .mockResolvedValueOnce({ json: async () => [] }); // Booked seats

        render(<BookTickets movieName="Movie 1" />, { wrapper: BrowserRouter });

        const dropdown = await screen.findByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'Theatre A' } });

        const seatCountInput = await screen.findByRole('spinbutton');
        const usernameInput = await screen.findByRole('textbox');

        expect(seatCountInput).toHaveValue(null);
        expect(usernameInput).toHaveValue('');
    });
});