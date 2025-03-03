import { useState } from 'react'
import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLResizeInfo,
	getDefaultColorTheme,
	resizeBox,
	StyleProp
} from 'tldraw'
import { cardShapeMigrations } from './card-shape-migrations'
import { cardShapeProps } from './card-shape-props'
import type { ICardShape } from './card-shape-types'
import { urlStyle } from './url-style'

// There's a guide at the bottom of this file!
	export class CardShapeUtil extends ShapeUtil<ICardShape> {
		static override type = 'CellEmbed' as const
		// [1]
		static override props = cardShapeProps
		// [2]
		static override migrations = cardShapeMigrations

		// [3]
		override isAspectRatioLocked(_shape: ICardShape) {
			return false
		}
		override canResize(_shape: ICardShape) {
			return true
		}

		// [4]
		getDefaultProps(): ICardShape['props'] {
			return {
				w: 300,
				h: 300,
				color: 'black',
				url: urlStyle,
			}
		}

		// [5]
		getGeometry(shape: ICardShape) {
			return new Rectangle2d({
				width: shape.props.w,
				height: shape.props.h,
				isFilled: true,
			})
		}

		// [6]
		component(shape: ICardShape) {
			const bounds = this.editor.getShapeGeometry(shape).bounds
			const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })

			const handleIframeLoad = (event: Event) => {
				const iframe = event.target;
				console.log("YEAH WE IN")
				console.log(event)
				console.log(iframe)
				// Your JavaScript injection here
				// iframe.contentWindow.postMessage({
				// 	type: "init",
				// 	data: {
				// 		// The init data will be passed to the iframe's init function
				// 		// This is where we can pass our initial configuration
				// 		targetElement: '#cell-ygc245c266dbnvs4',
				// 		hideSelector: '.sidebar'
				// 	}
				// }, "*");
			};
			return (
				<HTMLContainer
					id={shape.id}
					style={{
						border: '1px solid black',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						pointerEvents: 'all',
						backgroundColor: theme[shape.props.color].semi,
						color: theme[shape.props.color].solid,
						position: 'relative', // Added for absolute positioning of edit button
					}}
				>
						<iframe
							src={shape.props.url}
							width="100%"
							height="100%"
							allowFullScreen
							onLoad={handleIframeLoad}
						/>
				</HTMLContainer>
			)
		}
		// [7]
		indicator(shape: ICardShape) {
			return <rect width={shape.props.w} height={shape.props.h} />
		}

		// [8]
		override onResize(shape: ICardShape, info: TLResizeInfo<ICardShape>) {
			return resizeBox(shape, info)
		}
	}
/*
A utility class for the card shape. This is where you define the shape's behavior, 
how it renders (its component and indicator), and how it handles different events.

[1]
A validation schema for the shape's props (optional)
Check out card-shape-props.ts for more info.

[2]
Migrations for upgrading shapes (optional)
Check out card-shape-migrations.ts for more info.

[3]
Letting the editor know if the shape's aspect ratio is locked, and whether it 
can be resized or bound to other shapes. 

[4]
The default props the shape will be rendered with when click-creating one.

[5]
We use this to calculate the shape's geometry for hit-testing, bindings and
doing other geometric calculations. 

[6]
Render method — the React component that will be rendered for the shape. It takes the 
shape as an argument. HTMLContainer is just a div that's being used to wrap our text 
and button. We can get the shape's bounds using our own getGeometry method.
	
- [a] Check it out! We can do normal React stuff here like using setState.
   Annoying: eslint sometimes thinks this is a class component, but it's not.

- [b] You need to stop the pointer down event on buttons, otherwise the editor will
	   think you're trying to select drag the shape.

[7]
Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here

[8]
Resize handler — called when the shape is resized. Sometimes you'll want to do some 
custom logic here, but for our purposes, this is fine.
*/