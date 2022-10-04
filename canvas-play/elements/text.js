import { TEXT_DEFAULT_CONFIG } from "../constant/defaulValue";
import { setCtx } from '../utils/setCtx'

function fittingString(c, str, maxWidth) {
  var width = c.measureText(str).width;
  var ellipsis = '…';
  var ellipsisWidth = c.measureText(ellipsis).width;
  if (width<=maxWidth || width<=ellipsisWidth) {
    return str;
  } else {
    var len = str.length;
    while (width>=maxWidth-ellipsisWidth && len-->0) {
      str = str.substring(0, len);
      width = c.measureText(str).width;
    }
    return str+ellipsis;
  }
}

class Text {
  constructor (config = {}, events = {}, name, isReactive) {
    const state = {
      ...TEXT_DEFAULT_CONFIG,
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
    eleCtx.fillStyle = this.state.color
    let str = this.state.text
    if (this.state.maxWidth) {
      str = fittingString(eleCtx, str, this.state.maxWidth)
    }
    this.width = eleCtx.measureText(str).width
    this.height = eleCtx.measureText(str).height
    eleCtx.fillText(str, this.state.x, this.state.y)
  }
  getBondingBox() {
    return {
      x: this.state.x,
      y: this.state.y,
      h: this.height,
      w: this.width
    }
  }
}

export default Text