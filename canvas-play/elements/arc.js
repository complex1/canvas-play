import { ARC_DEFAULT_CONFIG } from "../constant/defaulValue"
import { setCallback } from '../utils/proxy'
import { arcPath } from '../path/arc'
import { setCtx } from '../utils/setCtx'
class Arc {
  constructor(config = {}, events = {}, name, isReactive) {
    const state = {
      ...ARC_DEFAULT_CONFIG,
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
  render(ctx) {
    const eleCtx = setCtx(ctx, this.state)
    const path = arcPath(
      this.state.x,
      this.state.y,
      this.state.r,
      this.state.startAngle,
      this.state.endAngle,
      this.state.close
    )
    if (this.state.backgroundColor) {
      eleCtx.fill(path)
    } else {
      eleCtx.stroke(path)
    }
  }
  getBondingBox() {
    const getQuadrant = (angle) => {
      if (angle > 0 && angle < 90) {
        return 0
      } else if (angle >= 90 && angle < 180 ) {
        return 1
      } else if (angle >= 180 && angle < 270) {
        return 2
      } else {
        return 3
      }
    }
    const startAng = ((this.state.startAngle * Math.PI) / 180)
    const endAng = ((this.state.endAngle * Math.PI) / 180)
    const startQuad = getQuadrant(this.state.startAngle)
    const endQuad = getQuadrant(this.state.endAngle)
    const r = this.state.r
    const xs = Number((r*Math.sin(startAng)).toFixed(6))
    const ys = Number((r*Math.cos(startAng)).toFixed(6))
    const xe = Number((r*Math.sin(endAng)).toFixed(6))
    const ye = Number((r*Math.cos(endAng)).toFixed(6))
    const minX = Math.min(xs, xe)
    const minY = Math.min(ys, ye)
    const maxX = Math.max(xs, xe)
    const maxY = Math.max(ys, ye)
    const xMax = [[maxX, maxX, maxX, maxX], [r, maxX, r, r], [r, maxX, maxX, r], [r, maxX, maxX, maxX]];
    const yMax = [[maxY, r, r, r], [maxY, maxY, r, r], [maxY, maxY, maxY, r], [maxY, maxY, maxY, maxY]];
    const xMin = [[minX, -r, -r, minX], [minX, minX, -r, minX], [minX, minX, minX, minX], [-r, -r, -r, minX]];
    const yMin = [[minY, -r, minY, minY], [minY, minY, minY, minY], [-r, -r, minY, -r], [-r, -r, minY, minY]];
    const x1 = xMin[endQuad][startQuad];
    const y1 = yMin[endQuad][startQuad];
    const x2 = xMax[endQuad][startQuad];
    const y2 = yMax[endQuad][startQuad];
    const x = this.state.x + x1
    const y = this.state.y - y2
    const w = x2 - x1 
    const h = y2 - y1
    return {
      x,y,w,h
    }
  }
}

export default Arc