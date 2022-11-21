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

  it('should not add duplicate destinations and display a validation message', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('00:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '00:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const duplicateDestinationInput = screen.getByPlaceholderText('London');
    const notDuplicateTimeInput = screen.getByDisplayValue('00:00');

    fireEvent.change(duplicateDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(notDuplicateTimeInput, { target: { value: '23:23' } });

    fireEvent.click(addDestinationButton);

    const parises = screen.getAllByDisplayValue('Paris');
    const validationMessage = screen.getByText(
      'Error: duplicate destinations invalid'
    );

    expect(parises.length).toBe(1);
    expect(validationMessage).toBeTruthy();
  });
});
