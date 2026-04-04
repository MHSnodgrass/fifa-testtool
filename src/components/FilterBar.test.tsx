import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  it('renders the initial selected stage correctly', () => {
    // Arrange: Render with 'ALL' selected
    render(<FilterBar selectedStage="ALL" onStageChange={vi.fn()} onSearch={vi.fn()} />);

    // Assert: The select dropdown should have 'All Stages' as its display value
    const selectElement = screen.getByRole('combobox', { name: /filter/i });
    expect(selectElement).toHaveValue('ALL');
  });

  it('calls onStageChange when the user selects a different stage', async () => {
    // Arrange: Create a spy function to listen to changes
    const mockOnStageChange = vi.fn();

    render(<FilterBar selectedStage="ALL" onStageChange={mockOnStageChange} onSearch={vi.fn()} />);

    // Act: Find the select element and simulate a user changing its value
    const selectElement = screen.getByRole('combobox', { name: /filter/i });

    // userEvent.selectOptions mimics a user clicking a dropdown and clicking an option
    await userEvent.selectOptions(selectElement, 'GROUP');

    // Assert: The component should have called our callback with the new value
    expect(mockOnStageChange).toHaveBeenCalledTimes(1);
    expect(mockOnStageChange).toHaveBeenCalledWith('GROUP');
  });

  it('calls onSearch when the user clicks the search button', async () => {
    // Arrange: Create a spy function to listen for the search action
    const mockOnSearch = vi.fn();

    render(<FilterBar selectedStage="ALL" onStageChange={vi.fn()} onSearch={mockOnSearch} />);

    // Act: Find the button and click it
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    // Assert: Verify the search callback fired
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
