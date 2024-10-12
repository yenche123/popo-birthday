
const waitMilli = (milli: number = 0): Promise<true> => {
  let _t = (a: (a1: true) => void) => {
    setTimeout(() => {
      a(true)
    }, milli)
  }

  return new Promise(_t)
}


// 不要使用 js runtime 的 structuredClone() 进行复制
// 因为 reactive（Proxy）“响应性” 复制后依然存在，但理应不该存在
const copyObject = <T = any>(obj: T): T => {
  let type = typeof obj
  if(type !== "object") return obj

  let obj2: T;
  try {
    obj2 = JSON.parse(JSON.stringify(obj))
  }
  catch(err) {
    return obj
  }
  return obj2
}

// 将字符串 转为 object
const strToObj = <T = any>(str: string): T => {
  let res = {}
  try {
    res = JSON.parse(str)
  }
  catch(err) {}
  return res as T
}

/**
 * 将对象转为 object
 * 若转换失败，返回空字符
 */
const objToStr = <T = any>(obj: T): string => {
  let str = ``
  try {
    str = JSON.stringify(obj)
  }
  catch(err) {}
  return str
}

// 快速把入参 val 包裹在 Promise 里返回
const getPromise = <T = any>(val: T): Promise<T> => {
  return new Promise(a => a(val)) 
}


/** compare version */
const compareVersion = (v1: string, v2: string) => {
  const list1 = v1.split('.')
  const list2 = v2.split('.')
  const len = Math.max(list1.length, list2.length)
  while (list1.length < len) {
    list1.push('0')
  }
  while (list2.length < len) {
    list2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(list1[i])
    const num2 = parseInt(list2[i])
    
    if(num1 > num2) return 1
    if(num1 < num2) return -1
  }

  return 0
}


const hasValue = <T>(
  val: any, 
  type: string,
  checkLength: boolean = true,
): val is T => {
  if(val && typeof val === type) {
    if(checkLength && Array.isArray(val)) {
      if(val.length < 1) return false
    }
    return true
  }
  return false
}

const isStringWithVal = (val: any): val is string => {
  return hasValue<string>(val, "string")
}


export default {
  waitMilli,
  copyObject,
  strToObj,
  objToStr,
  getPromise,
  compareVersion,
  isStringWithVal,
}