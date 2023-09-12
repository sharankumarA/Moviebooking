import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../Pages/Login";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import Constants from '../Utilities/Constants';

jest.mock("react-toastify");
window.sessionStorage.setItem = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("LoginPage", () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
        Promise.resolve({
            text: () => Promise.resolve("mocked-token"),
        })
    );
    test("renders the login form", () => {
        render(
            <Router>
                <LoginPage />
            </Router>
        );
        expect(screen.getByText("Sign In")).toBeInTheDocument();
        expect(screen.getByLabelText("LoginID")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Forget Password?")).toBeInTheDocument();
        expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    });

    it('displays validation errors', async () => {
        render(<Router>
            <LoginPage />
        </Router>);

        fireEvent.click(screen.getByRole('button', { name: 'Login' }));


        const LoginIdError = await screen.findByText('LoginId is required');
        const PasswordError = await screen.findByText('Password is required');

        expect(LoginIdError).toBeInTheDocument();
        expect(PasswordError).toBeInTheDocument();

    });




});