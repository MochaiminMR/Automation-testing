const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  async function _fetchWithAuth (url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  function putAccessToken (token) {
    localStorage.setItem('accessToken', token)
  }

  function getAccessToken () {
    return localStorage.getItem('accessToken')
  }

  async function register ({ email, name, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        email,
        name,
        password
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { user }
    } = responseJson

    return user
  }

  async function login ({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { token }
    } = responseJson

    return token
  }

  async function getOwnProfile () {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { user }
    } = responseJson

    return user
  }

  async function getAllUsers () {
    const response = await fetch(`${BASE_URL}/users`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { users }
    } = responseJson

    return users
  }

  async function getAllThreads () {
    const response = await fetch(`${BASE_URL}/threads`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { threads }
    } = responseJson

    return threads
  }

  async function getThreadsDetail (id) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${id}`)
      const responseJson = await response.json()

      const { status, message } = responseJson

      if (status !== 'success') {
        throw new Error(message || 'Failed to fetch thread detail')
      }

      const {
        data: { detailThread }
      } = responseJson

      return detailThread
    } catch (error) {
      throw new Error('Failed to fetch thread detail: ' + error.message)
    }
  }

  async function createThread ({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { thread }
    } = responseJson

    return thread
  }

  async function createComments ({ content, id }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content
        })
      }
    )

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { comment }
    } = responseJson

    return comment
  }

  async function upVoteThread (id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function downVoteThread (id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function neutralVoteThread (id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function upVoteThreadComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function downVoteThreadComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function neutralVoteThreadComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { vote }
    } = responseJson
    return vote
  }

  async function getLeaderboards () {
    const response = await _fetchWithAuth(`${BASE_URL}/leaderboards`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { leaderboards }
    } = responseJson

    return leaderboards
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadsDetail,
    createComments,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteThreadComment,
    downVoteThreadComment,
    neutralVoteThreadComment,
    getLeaderboards
  }
})()

export default api
