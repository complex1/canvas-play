export const setCallback = (cb) => ({
  set (obj, prop, value) {
    obj[prop] = value
    cb && cb()
    return true
  }
})