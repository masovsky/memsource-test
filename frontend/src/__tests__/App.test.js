import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Running...', () => {
  render(<App />);
  const runningElement = screen.getByText(/Running.../i);
  expect(runningElement).toBeDefined();
});
