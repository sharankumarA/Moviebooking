import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../Pages/Cart';
import { BrowserRouter as Router } from "react-router-dom";


jest.mock('react-router-dom', () => ({
    Navigate: () => null,
    useNavigate: jest.fn(),
}));

describe('Cart Component', () => {
    test('renders the "My bookings!" heading', () => {
        render(<Cart />);
        const heading = screen.getByText('My bookings!');

        expect(heading).toBeInTheDocument();
    });
    test('renders the "Back" button', () => {
        render(<Cart />);
        const backButton = screen.getByRole('button', { name: 'Back' });

        expect(backButton).toBeInTheDocument();
    });
    test('renders cart details', async () => {
        const mockCartDetails = [
            {
                movieName: 'Movie 1',
                theatreName: 'Theatre A',
                seatNumber: ['A1', 'A2'],
                numberOfTickets: 2,
            },
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => mockCartDetails,
        });

        render(<Cart />);

        const movieName = await screen.findByText('Movie 1');
        const theatreName = screen.getByText('Theatre: Theatre A');
        const seatNumber = screen.getByText('Seat Number: A1, A2');
        const numberOfTickets = screen.getByText('No. of Tickets: 2');

        expect(movieName).toBeInTheDocument();
        expect(theatreName).toBeInTheDocument();
        expect(seatNumber).toBeInTheDocument();
        expect(numberOfTickets).toBeInTheDocument();
    });

    test('renders "No booking found!" message when cart is empty', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => [],
        });

        render(<Cart />);

        const noBookingMessage = await screen.findByText('No booking found!');
        expect(noBookingMessage).toBeInTheDocument();
    });
});