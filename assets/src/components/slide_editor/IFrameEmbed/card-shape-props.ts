import { DefaultColorStyle, RecordProps, T } from 'tldraw'
import type { ICardShape } from './card-shape-types'
import { urlStyle } from './url-style'


// Validation for our custom card shape's props, using one of tldraw's default styles
export const cardShapeProps: RecordProps<ICardShape> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	url: urlStyle,
}

// To generate your own custom styles, check out the custom styles example.