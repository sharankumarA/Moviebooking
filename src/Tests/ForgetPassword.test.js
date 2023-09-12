import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgetPasswordPage from "../Pages/ForgetPassword";
import { BrowserRouter as Router } from "react-router-dom";


const findByTextSubstring = (text) =>
    screen.queryByText((content, element) => content.includes(text));


describe("ForgetPasswordPage", () => {
    test("renders username and new password fields correctly", () => {
        render(<Router><ForgetPasswordPage /></Router>);


        const usernameInput = screen.getByLabelText("Username");
        const newPasswordInput = screen.getByLabelText("New Password");


        expect(usernameInput).toBeInTheDocument();
        expect(newPasswordInput).toBeInTheDocument();
    });

    it('displays validation errors', async () => {
        render(<Router><ForgetPasswordPage /></Router>);

        fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));


        const LoginIdError = await screen.findByText('username must be at least 4 characters');
        const PasswordError = await screen.findByText('Password is required');

        expect(LoginIdError).toBeInTheDocument();
        expect(PasswordError).toBeInTheDocument();

    });

});
