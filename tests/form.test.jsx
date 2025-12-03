/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectForm from '../app/projects/components/ProjectForm.jsx'
import TechnologyInput from '../app/projects/components/TechnologyInput.jsx'

describe('ProjectForm Component', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders project form when open', () => {
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    expect(screen.getByText('Add New Project')).toBeInTheDocument()
    expect(screen.getByLabelText(/Project Title/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <ProjectForm 
        isOpen={false} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    expect(screen.queryByText('Add New Project')).not.toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /Create Project/ })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument()
      expect(screen.getByText('Description is required')).toBeInTheDocument()
      // Error message appears in both ProjectForm and TechnologyInput, so use getAllByText
      expect(screen.getAllByText('At least one technology is required').length).toBeGreaterThan(0)
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates URL format', async () => {
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    const imageUrlInput = screen.getByLabelText(/Image URL/)
    fireEvent.change(imageUrlInput, { target: { value: 'not-a-url' } })
    
    const submitButton = screen.getByRole('button', { name: /Create Project/ })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument()
    })
  })

  it('calls onSubmit with form data when valid', async () => {
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    // Fill required fields
    const titleInput = screen.getByLabelText(/Project Title/)
    fireEvent.change(titleInput, {
      target: { value: 'Test Project' }
    })
    
    const descriptionInput = screen.getByLabelText(/Description/)
    fireEvent.change(descriptionInput, {
      target: { value: 'Test description' }
    })
    
    // Add technology using the input field and Add button
    const techInput = screen.getByPlaceholderText(/Type a technology/)
    fireEvent.change(techInput, { target: { value: 'Vue.js' } })
    
    // Click the Add button next to the input
    const addButtons = screen.getAllByRole('button', { name: /Add/ })
    const techAddButton = addButtons[0] // First Add button is for technologies
    fireEvent.click(techAddButton)
    
    // Wait for technology to be added
    await waitFor(() => {
      expect(screen.getByText('Vue.js')).toBeInTheDocument()
    }, { timeout: 2000 })
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Create Project/ })
    fireEvent.click(submitButton)
    
    // Wait for onSubmit to be called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    }, { timeout: 3000 })
    
    // Verify the call arguments
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Project',
      description: 'Test description',
      imageUrl: null,
      projectUrl: null,
      githubUrl: null,
      technologies: ['Vue.js']
    })
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/ })
    fireEvent.click(cancelButton)
    
    expect(mockOnCancel).toHaveBeenCalled()
  })
})

describe('TechnologyInput Component', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders technology input field', () => {
    render(
      <TechnologyInput 
        technologies={[]} 
        onChange={mockOnChange} 
      />
    )
    
    expect(screen.getByPlaceholderText(/Type a technology/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add/ })).toBeInTheDocument()
  })

  it('displays predefined technology buttons', () => {
    render(
      <TechnologyInput 
        technologies={[]} 
        onChange={mockOnChange} 
      />
    )
    
    expect(screen.getByRole('button', { name: 'JavaScript' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next.js' })).toBeInTheDocument()
  })

  it('adds technology when typing and clicking add', () => {
    render(
      <TechnologyInput 
        technologies={[]} 
        onChange={mockOnChange} 
      />
    )
    
    const input = screen.getByPlaceholderText(/Type a technology/)
    fireEvent.change(input, { target: { value: 'Vue.js' } })
    
    const addButton = screen.getByRole('button', { name: /Add/ })
    fireEvent.click(addButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(['Vue.js'])
  })

  it('adds technology when pressing Enter', async () => {
    render(
      <TechnologyInput 
        technologies={[]} 
        onChange={mockOnChange} 
      />
    )
    
    const input = screen.getByPlaceholderText(/Type a technology/)
    fireEvent.change(input, { target: { value: 'Angular' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['Angular'])
    })
  })

  it('adds predefined technology when quick button clicked', () => {
    render(
      <TechnologyInput 
        technologies={[]} 
        onChange={mockOnChange} 
      />
    )
    
    const jsButton = screen.getByRole('button', { name: 'JavaScript' })
    fireEvent.click(jsButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(['JavaScript'])
  })

  it('displays selected technologies with remove buttons', () => {
    render(
      <TechnologyInput 
        technologies={['React', 'JavaScript']} 
        onChange={mockOnChange} 
      />
    )
    
    // Technologies are displayed in the "Selected Technologies" section
    // Query within that section to avoid conflicts with quick add buttons
    const selectedSection = screen.getByText('Selected Technologies:').closest('div')
    expect(selectedSection).toBeInTheDocument()
    expect(selectedSection).toHaveTextContent('React')
    expect(selectedSection).toHaveTextContent('JavaScript')
    expect(screen.getAllByLabelText(/Remove/).length).toBe(2)
  })

  it('removes technology when remove button clicked', () => {
    render(
      <TechnologyInput 
        technologies={['React', 'JavaScript']} 
        onChange={mockOnChange} 
      />
    )
    
    const removeButtons = screen.getAllByLabelText(/Remove/)
    fireEvent.click(removeButtons[0]) // Remove first technology
    
    expect(mockOnChange).toHaveBeenCalledWith(['JavaScript'])
  })

  it('prevents duplicate technologies', () => {
    render(
      <TechnologyInput 
        technologies={['React']} 
        onChange={mockOnChange} 
      />
    )
    
    const input = screen.getByPlaceholderText(/Type a technology/)
    fireEvent.change(input, { target: { value: 'React' } })
    
    const addButton = screen.getByRole('button', { name: /Add/ })
    fireEvent.click(addButton)
    
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('disables predefined buttons for already selected technologies', () => {
    render(
      <TechnologyInput 
        technologies={['JavaScript']} 
        onChange={mockOnChange} 
      />
    )
    
    const jsButton = screen.getByRole('button', { name: 'JavaScript' })
    expect(jsButton).toBeDisabled()
  })
})

describe('Form Integration Tests', () => {
  it('should show error state styling when validation fails', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnCancel = vi.fn()
    
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /Create Project/ })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      const titleInput = screen.getByLabelText(/Project Title/)
      expect(titleInput).toHaveClass('border-red-500')
    })
  })

  it('should show loading state during submission', async () => {
    const mockOnSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    const mockOnCancel = vi.fn()
    
    render(
      <ProjectForm 
        isOpen={true} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    )
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/Project Title/), {
      target: { value: 'Test Project' }
    })
    fireEvent.change(screen.getByLabelText(/Description/), {
      target: { value: 'Test description' }
    })
    
    // Add a technology
    const techInput = screen.getByPlaceholderText(/Type a technology/)
    fireEvent.change(techInput, { target: { value: 'React' } })
    fireEvent.click(screen.getByRole('button', { name: /Add/ }))
    
    const submitButton = screen.getByRole('button', { name: /Create Project/ })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Creating Project...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })
  })
})