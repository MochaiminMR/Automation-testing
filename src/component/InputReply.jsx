import { useState } from 'react'
import PropTypes from 'prop-types'

export default function InputReply ({ addcontent }) {
  const [textReply, setTextReply] = useState('')

  function onCommentSubmit (event) {
    event.preventDefault()
    addcontent(textReply)
    setTextReply('')
  }

  function onChangeTextReply (e) {
    setTextReply(e.target.value)
  }
  return (
    <div className="w-full">
      <form action="">
        <textarea
          value={textReply}
          onChange={onChangeTextReply}
          className="textarea textarea-bordered textarea-lg w-full"></textarea>
        <button
          type="submit"
          onClick={onCommentSubmit}
          className="btn btn-neutral">
          Reply
        </button>
      </form>
    </div>
  )
}

InputReply.propTypes = {
  addcontent: PropTypes.func.isRequired
}
