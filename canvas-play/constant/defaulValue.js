export const RECT_DEFAULT_CONFIG = {
  x: 0,
  y: 0,
  z: 0,
  h: 100,
  w: 100,
  borderWidth: 1,
  borderColor: '#000',
  backgroundColor: null,
  borderRadius: 0
}

export const LINE_DEFAULT_CONFIG = {
  points: [{x:100, y:100}, {x:110, y:80}, {x:120, y:100},{x:130, y:80}],
  borderWidth: 1,
  borderColor: '#000',
  radius: 10
}

export const ARC_DEFAULT_CONFIG = {
  x: 150,
  y: 150,
  r: 50,
  z: 10,
  startAngle: 30,
  endAngle: 120,
  close: false,
  borderWidth: 1,
  borderColor: '#000',
  backgroundColor: null
}

export const TEXT_DEFAULT_CONFIG = {
  x: 40,
  y: 40,
  maxWidth: null,
  font: '12px Verdana',
  text: 'Hello world',
  color: 'red'
}