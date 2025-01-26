const formatDateToReadable = (date: string | Date): string => {
  if (!date) return ''

  const dateObject = typeof date === 'string' ? new Date(date) : date

  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export { formatDateToReadable }
