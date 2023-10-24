import { render } from '@testing-library/react';
import ThemeSwitchButton from '../ThemeSwitchButton';

test('switch is initially checked', () => {
  const { getByRole } = render(<ThemeSwitchButton />);
  expect(getByRole('checkbox')).toBeChecked();
});
