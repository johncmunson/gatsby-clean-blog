export const disableScrollAtTopAndBottom = (e, target) => {
  const { deltaY, deltaX } = e
  const { scrollTop, scrollHeight, offsetHeight } = target
  const delta = deltaY === 0 ? deltaX : deltaY
  if (
    (scrollTop === 0 && delta < 0) ||
    (scrollTop >= scrollHeight - offsetHeight && delta > 0)
  ) {
    e.preventDefault()
  }
}
