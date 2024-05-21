import { describe, expect, it } from 'vitest'
import threadsTesReducer from './reducer'

/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by FETCH_THREADS action
 *  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_THREADS action
 *  - should return the talks with the toggled like talk when given by TOGGLE_UNLIKE_THREADS action
 *  - should return the threads with the toggled neutral threads when given by TOGGLE_NEUTRAL action
 *
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = []
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = threadsTesReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should return the talks when given by FETCH_THREADS action', () => {
    // arrange
    const initialState = []

    const action = {
      type: 'FETCH_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
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
        ]
      }
    }

    // action
    const nextState = threadsTesReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.threads)
  })

  // TOGGLE LIKE
  it('should return the talks with the toggled like threads when given by TOGGLE_LIKE action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'TOGGLE_LIKE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }

    // action
    const nextState = threadsTesReducer(initialState, action)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.includes(action.payload.userId)
          ? initialState[0].upVotesBy.filter(id => id !== action.payload.userId)
          : [...initialState[0].upVotesBy, action.payload.userId]
      }
    ])
  })

  // TOGGLE UNLIKE
  it('should return the talks with the toggled unlike threads when given by TOGGLE_UNLIKE action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'TOGGLE_UNLIKE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }

    // action
    const nextState = threadsTesReducer(initialState, action)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: initialState[0].downVotesBy.includes(action.payload.userId)
          ? initialState[0].downVotesBy.filter(
              id => id !== action.payload.userId
            )
          : [...initialState[0].downVotesBy, action.payload.userId]
      }
    ])
  })

  // TOGGLE NEUTRAL
  it('should return the threads with the toggled neutral threads when given by TOGGLE_NEUTRAL action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'TOGGLE_NEUTRAL',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1'
      }
    }

    // action
    const nextState = threadsTesReducer(initialState, action)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.includes(action.payload.userId)
          ? initialState[0].upVotesBy.filter(id => id !== action.payload.userId)
          : initialState[0].upVotesBy,
        downVotesBy: initialState[0].downVotesBy.includes(action.payload.userId)
          ? initialState[0].downVotesBy.filter(
              id => id !== action.payload.userId
            )
          : initialState[0].downVotesBy
      }
    ])
  })
})
