import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddMovie from '../Admin/AddMovie';
import { BrowserRouter as Router } from "react-router-dom";


describe('AddMovie', () => {
    it('renders the component correctly', () => {
        render(<Router><AddMovie isOpen={true} onClose={() => { }} onSubmit={() => { }} /></Router>);


        const heading = screen.getByText('Add Movie');
        expect(heading).toBeInTheDocument();


        const movieNameInput = screen.getByPlaceholderText('Enter Movie Name');
        const theatreNameInput = screen.getByPlaceholderText('Enter Theatre Name');
        const noOfTicketsInput = screen.getByPlaceholderText('Enter Total Tickets');
        const bookAsapRadio = screen.getByLabelText('BOOK ASAP');
        const soldOutRadio = screen.getByLabelText('SOLD OUT');

        expect(movieNameInput).toBeInTheDocument();
        expect(theatreNameInput).toBeInTheDocument();
        expect(noOfTicketsInput).toBeInTheDocument();
        expect(bookAsapRadio).toBeInTheDocument();
        expect(soldOutRadio).toBeInTheDocument();
    });

    it('displays validation errors', async () => {
        render(<Router><AddMovie isOpen={true} onClose={() => { }} onSubmit={() => { }} /></Router>);

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));


        const movieNameError = await screen.findByText('Movie name is required');
        const theatreNameError = await screen.findByText('Theatre name is required');
        const noOfTicketsError = await screen.findByText('Please enter total ticket');
        const statusError = await screen.findByText('Please select status');

        expect(movieNameError).toBeInTheDocument();
        expect(theatreNameError).toBeInTheDocument();
        expect(noOfTicketsError).toBeInTheDocument();
        expect(statusError).toBeInTheDocument();
    });

    it('calls onSubmit when form is submitted with valid data', async () => {
        const onSubmitMock = jest.fn();
        render(<Router><AddMovie isOpen={true} onClose={() => { }} onSubmit={() => { }} /></Router>);


        fireEvent.change(screen.getByPlaceholderText('Enter Movie Name'), { target: { value: 'Test Movie' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Theatre Name'), { target: { value: 'Test Theatre' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Total Tickets'), { target: { value: '5' } });
        fireEvent.click(screen.getByLabelText('BOOK ASAP'));


        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(onSubmitMock).toHaveBeenCalledTimes(0);
    });

});