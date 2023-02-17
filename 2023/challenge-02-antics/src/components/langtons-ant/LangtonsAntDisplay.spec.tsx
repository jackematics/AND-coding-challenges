import { render, screen } from '@testing-library/react';
import LangtonsAntDisplay from './LangtonsAntDisplay';

describe('LangtonsAntDisplay', () => {
  it('should generate an 8 x 7 grid on initial render', () => {
    render(<LangtonsAntDisplay />);
  });
});
