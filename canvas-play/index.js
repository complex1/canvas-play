import Rect from "./elements/rect"
import Arc from "./elements/arc"
import Text from "./elements/text"
import Line from "./elements/line"
class CanvasPlay {
  constructor (ele, height, width, reactive) {
    this.ele = ele
    this.ele.height = height
    this.ele.width = width
    this.ctx =  ele.getContext('2d')
    this.elements = {}
    this.isReactive = reactive || false

    this.ele.addEventListener('click', (e) => {
      const x = e.clientX
      const y = e.clientY
      Object.values(this.elements).sort((a,b) => b.z - a.z).every(element => {
        if (element.onClick) {
          const bondingBox = element.getBondingBox()
          if (bondingBox.x < x && bondingBox.x + bondingBox.w > x && bondingBox.y < y && bondingBox.y + bondingBox.h > y ) {
            element.onClick && element.onClick(e)
            return false
          }
        }
        return true
      })
    })

    this.ele.addEventListener('mousemove', (e) => {
      const x = e.clientX
      const y = e.clientY
      Object.values(this.elements).sort((a,b) => b.z - a.z).every(element => {
        if (element.onMouseMove) {
          const bondingBox = element.getBondingBox()
          if (bondingBox.x < x && bondingBox.x + bondingBox.w > x && bondingBox.y < y && bondingBox.y + bondingBox.h > y ) {
            element.onMouseMove && element.onMouseMove(e)
            return false
          }
        }
        return true
      })
    })
  }
  addElement (name, config, events, element) {
    if (!config.z) {
      config.z = 1
    }
    if (name in this.elements) {
      throw new Error(`Name ${name} already exist`)
    }
    let elementClass = null
    if (element === 'Rect') {
      elementClass = Rect
    } else if (element === 'Arc') {
      elementClass = Arc
    } else if (element === 'Line') {
      elementClass = Line
    } else if (element === 'Text') {
      elementClass = Text
    }
    if (elementClass) {
      this.elements[name] = new elementClass(config, {
        onUpdate: this.render.bind(this),
        ...events
      }, name, this.isReactive)
      this.render()
      return this.elements[name]
    } else {
      throw new Error('Element not exist')
    }
  }
  addRect (name, config = {}, events = {}) {
    return this.addElement(name, config, events, 'Rect')
  }
  addArc (name, config = {}, events = {}) {
    return this.addElement(name, config, events, 'Arc')
  }
  addText (name, config = {}, events = {}) {
    return this.addElement(name, config, events, 'Text')
  }
  addLine (name, config = {}, events = {}) {
    return this.addElement(name, config, events, 'Line')
  }
  render () {
    this.ctx.clearRect(0,0, this.ele.width, this.ele.height)
    Object.values(this.elements).sort((a,b) => b.z - a.z).forEach(element => {
      element.render(this.ctx)
    })
  }
}

export default CanvasPlay