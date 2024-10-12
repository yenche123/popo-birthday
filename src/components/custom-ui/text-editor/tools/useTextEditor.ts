import type {
  TeData,
  TextEditorSuccessRes,
  TextEditorParam,
  TextEditorResolver,
} from "./types"
import { computed, reactive, ref } from "vue"
import valTool from "~/utils/basic/val-tool"
import type { LiuTimeout } from "~/utils/basic/type-tool"

let _success: TextEditorResolver | undefined
let _resolve: TextEditorResolver | undefined

const enable = ref(false)
const show = ref(false)
const inputEl = ref<HTMLElement | null>(null)
const TRANSITION_DURATION = 120 // 200

const DEFAULT_MIN_LENGTH = 1
const DEFAULT_MAX_LENGTH = 20

const teData = reactive<TeData>({
  title: "",
  title_key: "",
  placeholder: "",
  placeholder_key: "",
  inputTxt: "",
  nativeInputTxt: "",
  minLength: DEFAULT_MIN_LENGTH,
  maxLength: DEFAULT_MAX_LENGTH,
  trim: true,
})

const canSubmit = computed(() => {
  let v = teData.inputTxt
  if(teData.trim) v = v.trim()
  if(v.length >= teData.minLength && v.length <= teData.maxLength) return true
  return false
})

let toggleTimeout: LiuTimeout
const _open = () => {
  if(show.value) return
  if(toggleTimeout) {
    clearTimeout(toggleTimeout)
  }
  enable.value = true

  toggleTimeout = setTimeout(() => {
    show.value = true
  }, 16)
}

const _close = () => {
  if(!enable.value) return
  if(toggleTimeout) {
    clearTimeout(toggleTimeout)
  }
  show.value = false

  toggleTimeout = setTimeout(() => {
    if(show.value) return
    enable.value = false
  }, TRANSITION_DURATION)
}

const onTapConfirm = () => {
  if(!canSubmit.value) return
  const v = teData.trim ? teData.inputTxt.trim() : teData.inputTxt
  _resolve && _resolve({ confirm: true, cancel: false, value: v })
  _resolve = undefined
  _success && _success({ confirm: true, cancel: false, value: v })
  _success = undefined
  _close()
}

const onTapCancel = () => {
  const v = teData.trim ? teData.inputTxt.trim() : teData.inputTxt
  _resolve && _resolve({ confirm: false, cancel: true, value: v })
  _resolve = undefined
  _success && _success({ confirm: false, cancel: true, value: v })
  _success = undefined
  _close()
}

const onInput = (e: Event) => {
  //@ts-expect-error
  teData.nativeInputTxt = e.target.value
}

export function initTextEditor() {
  return { 
    enable, 
    show, 
    teData, 
    onTapConfirm, 
    onTapCancel, 
    onInput,
    inputEl, 
    canSubmit,
    TRANSITION_DURATION,
  }
}

export async function showTextEditor(
  opt: TextEditorParam
): Promise<TextEditorSuccessRes> {
  teData.title = opt.title ?? ""
  teData.title_key = opt.title_key ?? ""
  teData.placeholder = opt.placeholder ?? ""
  teData.placeholder_key = opt.placeholder_key ?? ""
  setInputTxt(opt.value ?? "")

  if(typeof opt.minLength === "number") teData.minLength = opt.minLength
  else teData.minLength = DEFAULT_MIN_LENGTH
  if(typeof opt.maxLength === "number") teData.maxLength = opt.maxLength
  else teData.maxLength = DEFAULT_MAX_LENGTH

  if(typeof opt.trim === "boolean") teData.trim = opt.trim
  else teData.trim = true

  if(opt.success) {
    _success = opt.success
  }
  else {
    _success = undefined
  }

  _open()

  const _toFocus = async() => {
    await valTool.waitMilli(200)
    inputEl?.value?.focus()
  }
  _toFocus()
  
  const _wait = (a: TextEditorResolver): void => {
    _resolve = a
  }

  return new Promise(_wait)
}

function setInputTxt(text: string) {
  teData.inputTxt = text
  teData.nativeInputTxt = text
}


