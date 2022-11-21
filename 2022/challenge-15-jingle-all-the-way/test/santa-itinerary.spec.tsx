import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages';

describe('when adding destinations', () => {
  it('should create a new row with the destination and ETA', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('20:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '21:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const createdDestination = screen.getByDisplayValue('Paris');
    const createdEta = screen.getByDisplayValue('21:01');
    const removeButton = screen.getByText('x');

    expect(createdDestination).toBeTruthy();
    expect(createdEta).toBeTruthy();
    expect(removeButton).toBeTruthy();
  });

  it('should delete a destination', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('20:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '21:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const removeButton = screen.getByText('x');

    fireEvent.click(removeButton);

    const deletedDestination = screen.queryByDisplayValue('Paris');
    const deletedEta = screen.queryByDisplayValue('21:01');

    expect(deletedDestination).toBeNull();
    expect(deletedEta).toBeNull();
  });

  it('should not add duplicate destinations and display a validation message', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('20:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '21:01' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const duplicateDestinationInput = screen.getByPlaceholderText('London');
    const notDuplicateTimeInput = screen.getByDisplayValue('20:00');

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

  it('should not allow time inputs earlier than the previous, earliest being 9pm, latest 7:30am', () => {
    render(<Home />);

    const newDestinationInput = screen.getByPlaceholderText('London');
    const newTimeInput = screen.getByDisplayValue('20:00');

    fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
    fireEvent.change(newTimeInput, { target: { value: '22:00' } });

    const addDestinationButton = screen.getByText('+');
    fireEvent.click(addDestinationButton);

    const timeInvalidDestinationInput = screen.getByPlaceholderText('London');
    const timeInvalidTimeInput = screen.getByDisplayValue('20:00');

    fireEvent.change(timeInvalidDestinationInput, {
      target: { value: 'Reykjavik' },
    });
    fireEvent.change(timeInvalidTimeInput, { target: { value: '21:30' } });

    fireEvent.click(addDestinationButton);

    const reykjavik = screen.queryByDisplayValue('Reykjavik');
    const validationMessage = screen.getByText(
      'Error: itinerary must be in chronological order'
    );

    expect(reykjavik).toBeFalsy();
    expect(validationMessage).toBeTruthy();
  });
});
