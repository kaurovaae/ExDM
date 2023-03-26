import {render, screen}       from '@testing-library/react';
import App                    from '../index';

test('renders layout', () => {
    render(<App />);
    const linkElement = screen.getByText(/layout/i);
    expect(linkElement).toBeInTheDocument();
});
