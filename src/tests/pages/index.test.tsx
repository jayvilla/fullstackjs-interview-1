import { render, screen } from '@test-utils';
import HomePage from '@src/pages/index';

describe('Homepage Test', () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  test(`Title should contain 'Homepage'`, () => {
    expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  });

  test(`Content should contain 'Welcome to your new next.js application.'`, () => {
    expect(screen.getByText('Welcome to your new next.js application.')).toBeInTheDocument();
  });

  test.skip(`Skip Test Example`, () => {});
});
