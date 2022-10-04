export const rectPath = (x, y, h, w, r = 0) => {
    const dw = w - 2*r
    const dh = h - 2*r
    let path = ''
    // starting point 
    path += `M${x + r},${y + r}`
    // top-line
    path += `h${dw}`
    // t-r curve
    path += `a${r},${r} 0 0 1 ${r},${r}`
    // right line
    path += `v${dh}`
    // b-r curve
    path += `a${r},${r} 0 0 1 ${-r},${r}`
    // bottom line
    path += `h${-dw}`
    // b-l curve
    path += `a${r},${r} 0 0 1 ${-r},${-r}`
    // left line
    path += `v${-dh}`
    // t-l curve
    path += `a${r},${r} 0 0 1 ${r},${-r}`
    // close path
    path += 'z'
    return new Path2D(path)
  }
