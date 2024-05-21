/**
 * skenario test
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when add data success
 *  - should dispatch action and call alert correctly when data add failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import api from '../../utils/api'
import { asyncAddThread } from './action'
import { addThreadActionCreator } from './action' // pastikan ini adalah impor yang benar
import { showLoading, hideLoading } from 'react-redux-loading-bar'

// fake data
const fakeThread = {
  id: 'thread-2',
  title: 'Thread Kedua',
  body: 'Ini adalah thread kedua',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-2',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0
}

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread
  })

  afterEach(() => {
    api.createThread = api._createThread
    delete api._createThread
  })

  it('should dispatch action correctly when add data success', async () => {
    // arrange
    api.createThread = vi.fn().mockResolvedValue(fakeThread)

    // mock dispatch
    const dispatch = vi.fn()

    // action
    await asyncAddThread(fakeThread)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data add failed', async () => {
    // arrange
    api.createThread = vi.fn().mockRejectedValue(fakeErrorResponse)

    // mock dispatch
    const dispatch = vi.fn()

    // mock alert
    window.alert = vi.fn()

    // action
    await asyncAddThread(fakeThread)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
