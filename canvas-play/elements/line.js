import { LINE_DEFAULT_CONFIG } from "../constant/defaulValue"
import { setCallback } from '../utils/proxy'
import { linePath } from '../path/line'
import { setCtx } from '../utils/setCtx'
class Rect {
  constructor (config = {}, events = {}, name, isReactive) {
    const state = {
      ...LINE_DEFAULT_CONFIG,
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
    const path = linePath(
      JSON.parse(JSON.stringify(this.state.points)),
      this.state.radius
    )
    eleCtx.stroke(new Path2D(path))
  }
  getBondingBox () {
    const startX = Math.min(...this.state.points.map(e => e.x))
    const startY = Math.min(...this.state.points.map(e => e.y))
    const endX = Math.max(...this.state.points.map(e => e.x))
    const endY = Math.max(...this.state.points.map(e => e.y))
    const xMin = Math.min(startX, endX)
    const yMin = Math.min(startY, endY)
    const xMax = Math.max(startY, endY)
    const yMax = Math.max(startY, endY)
    return {
      h: yMax - yMin,
      w: xMax - xMin,
      x: xMin,
      y: yMin
    }
  }

}

export default Rect