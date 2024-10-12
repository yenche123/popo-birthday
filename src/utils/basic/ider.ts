import { customAlphabet } from 'nanoid'

function _createId(digits: number = 21) {
  const ABC = "123456789abcdefghijkmnopqrstuvwxyz"
  const nanoid = customAlphabet(ABC, digits)
  return nanoid()
}

const createUserId = () => {
  return "u0" + _createId()
}

export default {
  createUserId,
}