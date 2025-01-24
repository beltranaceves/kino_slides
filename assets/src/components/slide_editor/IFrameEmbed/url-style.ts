import { StyleProp, T } from 'tldraw'

export const urlStyle = StyleProp.define('cell:url', {
  defaultValue: '',
  type: T.httpUrl,
})

export type UrlStyle = typeof urlStyle
