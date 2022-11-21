import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages';

describe('when adding destinations', () => {
  it('should create a new row with the destination and ETA', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('00:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '00:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const createdDestination = screen.getByDisplayValue('Paris');
    const createdEta = screen.getByDisplayValue('00:01');
    const removeButton = screen.getByText('x');

    expect(createdDestination).toBeTruthy();
    expect(createdEta).toBeTruthy();
    expect(removeButton).toBeTruthy();
  });

  it('should delete a destination', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('00:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '00:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const removeButton = screen.getByText('x');

    fireEvent.click(removeButton);

    const deletedDestination = screen.queryByDisplayValue('Paris');
    const deletedEta = screen.queryByDisplayValue('00:01');

    expect(deletedDestination).toBeNull();
    expect(deletedEta).toBeNull();
  });
});
