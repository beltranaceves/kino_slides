import { TLBaseShape, TLDefaultColorStyle } from 'tldraw'
import { UrlStyle } from './url-style'

// A type for our custom card shape
export type ICardShape = TLBaseShape<
	'CellEmbed',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
		url: UrlStyle
	}
>