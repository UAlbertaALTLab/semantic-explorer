import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeSwitchButton from '../ThemeSwitchButton';

describe('ThemeSwitchButton', () => {
  test('renders switch button', () => {
    render(<ThemeSwitchButton />);
    const switchButton = screen.getByRole('checkbox');
    expect(switchButton).toBeInTheDocument();
  });

  test('switch button is checked by default', () => {
    render(<ThemeSwitchButton />);
    const switchButton = screen.getByRole('checkbox');
    expect(switchButton).toBeChecked();
  });

  test('clicking switch button toggles its state', () => {
    render(<ThemeSwitchButton />);
    const switchButton = screen.getByRole('checkbox');
    userEvent.click(switchButton);
    expect(switchButton).not.toBeChecked();
    userEvent.click(switchButton);
    expect(switchButton).toBeChecked();
  });
});
