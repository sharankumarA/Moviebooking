import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';
import MoviePage from '../Admin/MoviePage';


describe('App component', () => {
  test('renders logo and title', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo');
    const title = screen.getByText(/Movie Booking App/i);

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });




});
