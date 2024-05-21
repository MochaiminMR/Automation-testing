
/**
 * skenario testing
 *
 * - InputLogin component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import InputLogin from './InputLogin'

expect.extend(matchers)
describe('InputLogin component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should handle username typing correctly', async () => {
    // Arrange
    render(<InputLogin login={() => {}} />)
    const emailInput = await screen.getByPlaceholderText('Email')
    // Action
    await userEvent.type(emailInput, 'moci@gmail.com')
    // Assert
    expect(emailInput).toHaveValue('moci@gmail.com')
  })
  it('should handle password typing correctly', async () => {
    // Arrange
    render(<InputLogin login={() => {}} />)
    const passwordInput = await screen.getByPlaceholderText('Password')
    // Action
    await userEvent.type(passwordInput, 'passwordtest')
    // Assert
    expect(passwordInput).toHaveValue('passwordtest')
  })
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn()
    render(<InputLogin login={mockLogin} />)
    const emailInput = await screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'moci@gmail.com')
    const passwordInput = await screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput, 'cimin123')
    const loginButton = await screen.getByRole('button', { name: 'Login' })
    // Action
    await userEvent.click(loginButton)
    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'moci@gmail.com',
      password: 'cimin123'
    })
  })
})
