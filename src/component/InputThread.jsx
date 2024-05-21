import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import styles
import { htmlToText } from 'html-to-text'

import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'

export default function InputThread ({ addThread }) {
  const [title, onTitleChange] = useInput('')
  const [category, onCategoryChange] = useInput('')
  const [body, setBody] = useState('') // Gunakan useState karena nilai awal body kosong

  function onAddThread (event) {
    event.preventDefault()
    if (body.trim()) {
      const textBody = htmlToText(body, {
        wordwrap: 130
      })
      addThread({ title, category, body: textBody })
      onTitleChange('')
      onCategoryChange('')
      setBody('')
    }
  }

  return (
    <div className='w-full'>
      <form action='' className='flex flex-col gap-y-4'>
        <label className='input input-bordered flex items-center gap-2'>
          <input
            value={title}
            onChange={onTitleChange}
            type='text'
            className='grow'
            placeholder='Title'
            required
          />
        </label>

        <label className='input input-bordered flex items-center gap-2'>
          <input
            type='text'
            className='grow'
            value={category}
            onChange={onCategoryChange}
            placeholder='Category'
            required
          />
        </label>

        <ReactQuill
          value={body}
          onChange={setBody}
          placeholder='Body'
          theme='snow'
          className='w-full text-base h-[200px]'
        />

        <button
          type='submit'
          onClick={onAddThread}
          className='btn btn-neutral mt-10'
        >
          Create
        </button>
      </form>
    </div>
  )
}

InputThread.propTypes = {
  addThread: PropTypes.func.isRequired
}
