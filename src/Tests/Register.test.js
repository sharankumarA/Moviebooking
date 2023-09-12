import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RegisterPage from '../Pages/Register';
import { BrowserRouter as Router } from "react-router-dom";


describe('RegisterPage', () => {

    it('renders form fields', () => {
        render(<Router><RegisterPage /></Router>);

        expect(screen.getByLabelText('Firstname')).toBeInTheDocument();
        expect(screen.getByLabelText('Lastname')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('LoginID')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Contact')).toBeInTheDocument();
    });

    it('displays validation errors', async () => {
        render(<Router><RegisterPage /></Router>);

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));


        const FirstNameError = await screen.findByText('FirstName is required');
        const LastNameError = await screen.findByText('LastName is required');
        const EmailError = await screen.findByText('Email is required');
        const LoginIdError = await screen.findByText('Login ID is required');
        const PasswordError = await screen.findByText('Password must be at least 4 characters');
        const ContactError = await screen.findByText('Phone Number is required');

        expect(FirstNameError).toBeInTheDocument();
        expect(LastNameError).toBeInTheDocument();
        expect(EmailError).toBeInTheDocument();
        expect(LoginIdError).toBeInTheDocument();
        expect(PasswordError).toBeInTheDocument();
        expect(ContactError).toBeInTheDocument();

    });
});