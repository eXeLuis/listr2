import type { ListrOptions } from '@interfaces/listr.interface'
import type { SupportedRenderer, ListrRendererFactory, ListrRendererValue, ListrRenderer } from '@interfaces/renderer.interface'
import { DefaultRenderer } from '@renderer/default.renderer'
import { SilentRenderer } from '@renderer/silent.renderer'
import { SimpleRenderer } from '@renderer/simple.renderer'
import { VerboseRenderer } from '@renderer/verbose.renderer'
import { assertFunctionOrSelf } from '@utils/assert'

const renderers: Record<'default' | 'simple' | 'verbose' | 'silent', typeof ListrRenderer> = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  silent: SilentRenderer
}

function isRendererSupported (renderer: ListrRendererFactory): boolean {
  return process.stdout.isTTY === true || renderer.nonTTY === true
}

export function getRendererClass (renderer: ListrRendererValue): ListrRendererFactory {
  if (typeof renderer === 'string') {
    return renderers[renderer] || renderers.default
  }

  return typeof renderer === 'function' ? renderer : renderers.default
}

export function getRenderer (
  renderer: ListrRendererValue,
  fallbackRenderer?: ListrRendererValue,
  fallbackCondition?: ListrOptions['rendererFallback'],
  silentCondition?: ListrOptions['rendererSilent']
): SupportedRenderer {
  let returnValue: SupportedRenderer
  let ret = getRendererClass(renderer)

  returnValue = { renderer: ret, nonTTY: false }

  const evaluateSilent = assertFunctionOrSelf(silentCondition)

  const evaluateFallback = assertFunctionOrSelf(fallbackCondition)

  if (evaluateSilent) {
    ret = getRendererClass('silent')
    returnValue = { renderer: ret, nonTTY: true }
  } else if (!isRendererSupported(ret) || evaluateFallback) {
    ret = getRendererClass(fallbackRenderer)
    returnValue = { renderer: ret, nonTTY: true }
  }

  return returnValue
}
