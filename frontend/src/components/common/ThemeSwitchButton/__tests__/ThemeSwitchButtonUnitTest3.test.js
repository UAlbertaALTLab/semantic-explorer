import { fireEvent, render } from '@testing-library/react';
import ThemeSwitchButton from '../ThemeSwitchButton';

test('clicking the switch toggles its checked state', () => {
  const { getByRole } = render(<ThemeSwitchButton />);
  const switchElement = getByRole('checkbox');
  expect(switchElement).toBeChecked();
  fireEvent.click(switchElement);
  expect(switchElement).not.toBeChecked();
  fireEvent.click(switchElement);
  expect(switchElement).toBeChecked();
});
