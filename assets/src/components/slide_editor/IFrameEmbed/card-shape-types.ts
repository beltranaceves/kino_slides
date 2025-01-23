import { TLBaseShape, TLDefaultColorStyle } from 'tldraw'

// A type for our custom card shape
export type ICardShape = TLBaseShape<
	'CellEmbed',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
	}
>