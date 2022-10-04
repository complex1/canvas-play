import CanvasPlay from './canvas-play'

const canvasPlay = new CanvasPlay(document.querySelector('canvas'), 300, 300)
const rect = canvasPlay.addRect('rect1')
const arc = canvasPlay.addArc('arc1')
const text = canvasPlay.addText('text')
const line = canvasPlay.addLine('line')
rect.onClick = (e) => {
  rect.state.x = rect.state.x + 10
  rect.state.y = rect.state.y + 10
  canvasPlay.render()
}
const b = arc.getBondingBox()
arc.onClick = () => {
  arc.state.startAngle = arc.state.startAngle + 10
  arc.state.endAngle = arc.state.endAngle + 10
  canvasPlay.render()
}
window.canvasPlay = canvasPlay
