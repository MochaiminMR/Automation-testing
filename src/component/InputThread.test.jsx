import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import InputThread from './InputThread'
import { htmlToText } from 'html-to-text'

expect.extend(matchers)

describe('InputThread component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<InputThread addThread={() => {}} />)
    const titleInput = await screen.getByPlaceholderText('Title')

    // Action
    await userEvent.type(titleInput, 'test')

    // Assert
    expect(titleInput).toHaveValue('test')
  })

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<InputThread addThread={() => {}} />)
    const categoryInput = await screen.getByPlaceholderText('Category')

    // Action
    await userEvent.type(categoryInput, 'testing')

    // Assert
    expect(categoryInput).toHaveValue('testing')
  })

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<InputThread addThread={() => {}} />)
    const bodyInput = document.querySelector('.ql-editor')

    // Action
    await userEvent.type(bodyInput, 'haloo semuanya')

    // Assert
    expect(bodyInput).toHaveTextContent('haloo semuanya')
  })

  // it('should call addThread function when add button is clicked', async () => {
  //   // Arrange
  //   const mockAddThread = vi.fn()
  //   render(<InputThread addThread={mockAddThread} />)
  //   const titleInput = await screen.getByPlaceholderText('Title')
  //   const categoryInput = await screen.getByPlaceholderText('Category')
  //   const bodyInput = document.querySelector('.ql-editor')
  //   const createButton = await screen.getByRole('button', { name: 'Create' })

  //   // Action
  //   await userEvent.type(titleInput, 'title')
  //   await userEvent.type(categoryInput, 'category')
  //   await userEvent.type(bodyInput, 'body')
  //   await userEvent.click(createButton)

  //   // Assert
  //   const expectedBody = htmlToText(bodyInput.innerHTML, {
  //     wordwrap: 130
  //   })
  //   expect(mockAddThread).toHaveBeenCalledWith({
  //     title: 'title',
  //     category: 'category',
  //     body: expectedBody
  //   })
  // })
})
