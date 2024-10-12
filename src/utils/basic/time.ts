


const isWithinMillis = (stamp: number, ms: number) => {
  const now = Date.now()
  const diff = now - stamp
  if(diff < ms) return true
  return false
}

export default {
  isWithinMillis,
}