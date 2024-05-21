/**
 * skenario testing
 *
 * - InputRegister component
 *   - should handle Username typing correctly
 *   - should handle Email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import InputRegister from './InputRegister'

expect.extend(matchers)
describe('InputRegister component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<InputRegister register={() => {}} />)
    const usernameInput = await screen.getByPlaceholderText('Username')
    // Action
    await userEvent.type(usernameInput, 'usernametest')
    // Assert
    expect(usernameInput).toHaveValue('usernametest')
  })
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<InputRegister register={() =>{}}/>)
    const emailInput = await screen.getByPlaceholderText('Email')
    //  Action
    await userEvent.type(emailInput, 'moci@gmail.com');
    // Assert
    expect(emailInput).toHaveValue('moci@gmail.com')
  })
  it('should handle password typing correctly', async () => {
    // Arrange
    render(<InputRegister register={() => {}} />)
    const passwordInput = await screen.getByPlaceholderText('Password')
    // Action
    await userEvent.type(passwordInput, 'passwordtest')
    // Assert
    expect(passwordInput).toHaveValue('passwordtest')
  })
  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockregister = vi.fn()
    render(<InputRegister register={mockregister} />)
    const usernameInput = await screen.getByPlaceholderText('Username')
    const emailInput = await screen.getByPlaceholderText('Email')
    const passwordInput = await screen.getByPlaceholderText('Password')
    const registerButton = await screen.getByRole('button', { name: 'Register' })
    // Action
    await userEvent.type(usernameInput, 'usernametest')
    await userEvent.type(emailInput, 'moci@gmail.com')
    await userEvent.type(passwordInput, 'passwordtest')
    await userEvent.click(registerButton)
    // Assert
    expect(mockregister).toHaveBeenCalledWith({
      name: 'usernametest',
      email: 'moci@gmail.com',
      password: 'passwordtest'
    })
  })
})
