import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../Pages/NotFound';

describe('NotFoundPage Component', () => {
    test('renders the "404" header', () => {
        render(<NotFoundPage />);
        const header404 = screen.getByText('404');

        expect(header404).toBeInTheDocument();
    });

    test('renders the "Page Not Found" text', () => {
        render(<NotFoundPage />);
        const pageNotFoundText = screen.getByText('Page Not Found');

        expect(pageNotFoundText).toBeInTheDocument();

    });
    test('renders the "Go back to Home" link with the correct href', () => {
        render(<NotFoundPage />);
        const goBackLink = screen.getByText('Go back to Home');

        expect(goBackLink).toBeInTheDocument();
        expect(goBackLink.href).toBe('http://localhost/');
    });
});