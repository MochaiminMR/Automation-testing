const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', options)
}

function truncateText (text) {
  if (text.length > 100) {
    const words = text.split(' ')
    let truncatedText = ''
    let charCount = 0
    for (const word of words) {
      if (charCount + word.length <= 100) {
        truncatedText += word + ' '
        charCount += word.length + 1 // tambahkan 1 untuk spasi
      } else {
        break
      }
    }
    return truncatedText.trim() + '...'
  }
  return text
}

export {
  formatDate,
  truncateText
}
