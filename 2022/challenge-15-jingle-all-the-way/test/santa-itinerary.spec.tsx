import { render, screen, fireEvent } from '@testing-library/react';
import SantaItinerary, {
  DestinationData,
} from '../components/itinerary/SantaItinerary';
import ValidationResult from '../components/itinerary/utils/validation-results';
import MockCityData from './mock-city-data';

describe('when adding destinations', () => {
  it('should create a new row with the destination and ETA', () => {
    render(
      <SantaItinerary
        cityData={MockCityData.mockCityData}
        itineraryCallback={() => {}}
      />
    );

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
    render(
      <SantaItinerary
        cityData={MockCityData.mockCityData}
        itineraryCallback={() => {}}
      />
    );

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

  describe('input validation', () => {
    it('should not add duplicate destinations and display a validation message', () => {
      render(
        <SantaItinerary
          cityData={MockCityData.mockCityData}
          itineraryCallback={() => {}}
        />
      );

      const newDestinationInput = screen.getByPlaceholderText('London');
      const newTimeInput = screen.getByDisplayValue('20:00');

      fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
      fireEvent.change(newTimeInput, { target: { value: '21:01' } });

      const addDestinationButton = screen.getByText('+');
      fireEvent.click(addDestinationButton);

      const duplicateDestinationInput = screen.getByPlaceholderText('London');
      const notDuplicateTimeInput = screen.getByDisplayValue('20:00');

      fireEvent.change(duplicateDestinationInput, {
        target: { value: 'Paris' },
      });
      fireEvent.change(notDuplicateTimeInput, { target: { value: '23:23' } });

      fireEvent.click(addDestinationButton);

      const parises = screen.getAllByDisplayValue('Paris');
      const validationMessage = screen.getByText(
        ValidationResult.duplicateDestinationResult.message
      );

      expect(parises.length).toBe(1);
      expect(validationMessage).toBeTruthy();
    });

    it('should not allow time inputs earlier than the previous', () => {
      render(
        <SantaItinerary
          cityData={MockCityData.mockCityData}
          itineraryCallback={() => {}}
        />
      );

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
        ValidationResult.chronilogicallyDisorderedResult.message
      );

      expect(reykjavik).toBeFalsy();
      expect(validationMessage).toBeTruthy();
    });

    it('should not allow time inputs earlier than 8pm', () => {
      render(
        <SantaItinerary
          cityData={MockCityData.mockCityData}
          itineraryCallback={() => {}}
        />
      );

      const newDestinationInput = screen.getByPlaceholderText('London');
      const newTimeInput = screen.getByDisplayValue('20:00');

      fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
      fireEvent.change(newTimeInput, { target: { value: '19:00' } });

      const addDestinationButton = screen.getByText('+');
      fireEvent.click(addDestinationButton);

      const paris = screen.queryByDisplayValue('Paris');
      const validationMessage = screen.getByText(
        ValidationResult.destinationEtaOutOfBoundsResult.message
      );

      expect(paris).toBeFalsy();
      expect(validationMessage).toBeTruthy();
    });

    it('should not allow time inputs later than 8am', () => {
      render(
        <SantaItinerary
          cityData={MockCityData.mockCityData}
          itineraryCallback={() => {}}
        />
      );

      const newDestinationInput = screen.getByPlaceholderText('London');
      const newTimeInput = screen.getByDisplayValue('20:00');

      fireEvent.change(newDestinationInput, { target: { value: 'Paris' } });
      fireEvent.change(newTimeInput, { target: { value: '08:00' } });

      const addDestinationButton = screen.getByText('+');
      fireEvent.click(addDestinationButton);

      const paris = screen.queryByDisplayValue('Paris');
      const validationMessage = screen.getByText(
        ValidationResult.destinationEtaOutOfBoundsResult.message
      );

      expect(paris).toBeFalsy();
      expect(validationMessage).toBeTruthy();
    });

    it('should not allow invalid cities', () => {
      render(
        <SantaItinerary
          cityData={MockCityData.mockCityData}
          itineraryCallback={() => {}}
        />
      );

      const newDestinationInput = screen.getByPlaceholderText('London');
      const newTimeInput = screen.getByDisplayValue('20:00');

      fireEvent.change(newDestinationInput, { target: { value: 'abcdefg' } });
      fireEvent.change(newTimeInput, { target: { value: '05:00' } });

      const addDestinationButton = screen.getByText('+');
      fireEvent.click(addDestinationButton);

      const invalidCity = screen.queryByDisplayValue('Abcdefg');
      const validationMessage = screen.getByText(
        ValidationResult.cityNotAvailableResult.message
      );

      expect(invalidCity).toBeFalsy();
      expect(validationMessage).toBeTruthy();
    });
  });
});
