export const setCtx = (ctx, state) => {
  ctx.lineWidth = state.borderWidth
  ctx.strokeStyle = state.borderColor
  ctx.fillStyle = state.backgroundColor || 'transparent'
  ctx.filter = state.filter
  ctx.font = state.font
  ctx.fontKerning = state.fontKerning
  ctx.fontStretch = state.fontStretch
  ctx.fontVariantCaps = state.fontVariantCaps
  ctx.globalAlpha = state.globalAlpha
  ctx.letterSpacing = state.letterSpacing
  ctx.lineDashOffset = state.lineDashOffset
  ctx.shadowBlur = state.shadowBlur
  ctx.shadowColor = state.shadowColor
  ctx.shadowOffsetX = state.shadowOffsetX
  ctx.shadowOffsetY = state.shadowOffsetY
  ctx.textAlign = state.textAlign
  ctx.textBaseline = state.textBaseline
  ctx.textRendering = state.textRendering
  ctx.wordSpacing = state.wordSpacing
  return ctx
}