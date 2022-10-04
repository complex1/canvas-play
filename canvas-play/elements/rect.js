import { RECT_DEFAULT_CONFIG } from "../constant/defaulValue"
import { setCallback } from '../utils/proxy'
import { rectPath } from '../path/rect'
import { setCtx } from '../utils/setCtx'
class Rect {
  constructor (config = {}, events = {}, name, isReactive) {
    const state = {
      ...RECT_DEFAULT_CONFIG,
      ...config,
      name
    }
    this.onUpdate = events.onUpdate
    this.onClick = events.onClick

    if (isReactive) {
      this.state = new Proxy(state, setCallback(this.onUpdate))
    } else {
      this.state = state
    }
  }
  render (ctx) {
    const eleCtx = setCtx(ctx, this.state)
    const path = rectPath(
      this.state.x,
      this.state.y,
      this.state.h,
      this.state.w,
      this.state.borderRadius,
    )
    if (this.state.backgroundColor) {
      eleCtx.fill(path)
    } else {
      eleCtx.stroke(path)
    }
  }
  getBondingBox () {
    return {
      h: this.state.h,
      w: this.state.w,
      x: this.state.x,
      y: this.state.y
    }
  }
}

export default Rect