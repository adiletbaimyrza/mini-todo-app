const getAdjustedDateByTimezone = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)

export { getAdjustedDateByTimezone }
