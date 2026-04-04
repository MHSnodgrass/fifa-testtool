import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('displays the text content when isOpen is true', () => {
    // We have to wrap Sidebar in a MemoryRouter because it uses React Router's <NavLink>
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} toggleSideBar={vi.fn()} />
      </MemoryRouter>
    );

    // Assert: Check that the main title and link texts are visible
    // (meaning their opacity-100 class is applied, making them visible)
    const titleElement = screen.getByText("FIFA '26");
    const eventsLink = screen.getByText('Events');

    expect(titleElement).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();

    // Since isOpen is true, they should have the visible classes
    expect(titleElement.parentElement).toHaveClass('opacity-100');
    expect(eventsLink).toHaveClass('opacity-100');
  });

  it('hides the text content when isOpen is false', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={false} toggleSideBar={vi.fn()} />
      </MemoryRouter>
    );

    // The text elements are still rendered in the DOM, but they are visually hidden
    const titleElement = screen.getByText("FIFA '26");

    // Assert: Ensure the parent container has the hidden classes applied
    expect(titleElement.parentElement).toHaveClass('opacity-0');
    expect(titleElement.parentElement).toHaveClass('max-w-0');
  });

  it('calls toggleSideBar when the toggle button is clicked', async () => {
    const mockToggleSideBar = vi.fn();

    render(
      <MemoryRouter>
        <Sidebar isOpen={true} toggleSideBar={mockToggleSideBar} />
      </MemoryRouter>
    );

    // Act: Find the toggle button (it has the material icon text 'keyboard_double_arrow_left')
    const toggleButton = screen.getByRole('button', { name: /keyboard_double_arrow_left/i });
    await userEvent.click(toggleButton);

    // Assert: Verify the parent callback was fired
    expect(mockToggleSideBar).toHaveBeenCalledTimes(1);
  });
});
