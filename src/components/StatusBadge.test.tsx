import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renders IN_PROGRESS status as LIVE', () => {
    // 1. Render the component
    render(<StatusBadge status="IN_PROGRESS" />);

    // 2. Query the element by its text
    const badgeElement = screen.getByText('LIVE');

    // 3. Assert it exists and has correct classes
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('uppercase');
  });

  it('renders COMPLETED status correctly', () => {
    render(<StatusBadge status="FINISHED" />);
    expect(screen.getByText('FINISHED')).toBeInTheDocument();
  });
});
