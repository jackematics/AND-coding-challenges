import { render, screen } from '@testing-library/react';
import LangtonsAntUi from './LangtonsAntUi';

describe('LangtonsAntUi', () => {
  it('should generate an 8 x 7 grid on initial render', () => {
    render(<LangtonsAntUi />);
  });
});
