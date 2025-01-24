import {
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultToolbar,
	DefaultToolbarContent,
	TLComponents,
	TLUiOverrides,
	Tldraw,
	TldrawUiMenuItem,
	computed,
	track,
	useIsToolSelected,
	useTools,
} from 'tldraw'
import 'tldraw/tldraw.css'
import { SlideShapeTool } from './SlideShapeTool'
import { SlideShapeUtil } from './SlideShapeUtil'
import { SlidesPanel } from './SlidesPanel'
import './slides.css'
import { $currentSlide, getSlides, moveToSlide } from './useSlides'
import { embedDefinitions } from './EmbedConfig';
import { useState } from 'react'
import { CardShapeUtil } from './IFrameEmbed/CardShapeUtil'
import { CardShapeTool } from './IFrameEmbed/CardShapeTool'
import { CustomStylePanel } from './IFrameEmbed/CustomStylePanel'


const components: TLComponents = {
	HelperButtons: SlidesPanel,
	Minimap: null,
	Toolbar: (props) => {
		const tools = useTools()
		const isSlideSelected = useIsToolSelected(tools['slide'])
		const isCardSelected = useIsToolSelected(tools['CellEmbed'])
		return (
			<DefaultToolbar {...props}>
				<TldrawUiMenuItem {...tools['slide']} isSelected={isSlideSelected} />
				<TldrawUiMenuItem {...tools['CellEmbed']} isSelected={isCardSelected} />
				<DefaultToolbarContent />
			</DefaultToolbar>
		)
	},
	KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<TldrawUiMenuItem {...tools['slide']} />
				<TldrawUiMenuItem {...tools['CellEmbed']} />
				<DefaultKeyboardShortcutsDialogContent />
			</DefaultKeyboardShortcutsDialog>
		)
	},
	StylePanel: CustomStylePanel
}

const overrides: TLUiOverrides = {
	actions(editor, actions) {
		const $slides = computed('slides', () => getSlides(editor))
		return {
			...actions,
			'next-slide': {
				id: 'next-slide',
				label: 'Next slide',
				kbd: 'right',
				onSelect() {
					const slides = $slides.get()
					const currentSlide = $currentSlide.get()
					const index = slides.findIndex((s) => s.id === currentSlide?.id)
					const nextSlide = slides[index + 1] ?? currentSlide ?? slides[0]
					if (nextSlide) {
						editor.stopCameraAnimation()
						moveToSlide(editor, nextSlide)
					}
				},
			},
			'previous-slide': {
				id: 'previous-slide',
				label: 'Previous slide',
				kbd: 'left',
				onSelect() {
					const slides = $slides.get()
					const currentSlide = $currentSlide.get()
					const index = slides.findIndex((s) => s.id === currentSlide?.id)
					const previousSlide = slides[index - 1] ?? currentSlide ?? slides[slides.length - 1]
					if (previousSlide) {
						editor.stopCameraAnimation()
						moveToSlide(editor, previousSlide)
					}
				},
			},
		}
	},
	tools(editor, tools) {
		tools.slide = {
			id: 'slide',
			icon: 'group',
			label: 'Slide',
			kbd: 's',
			onSelect: () => editor.setCurrentTool('slide'),
		}
		tools.CellEmbed = {
			id: 'CellEmbed',
			icon: 'your-icon',
			label: 'Card',
			kbd: 'c',
			onSelect: () => editor.setCurrentTool('CellEmbed'),
		}
		return tools
	},
}


const SlidesEditor = track(() => {
	const [isFullscreen, setIsFullscreen] = useState(false)

	const toggleFullscreen = () => {
		if (!isFullscreen) {
			document.documentElement.requestFullscreen()
		} else {
			document.exitFullscreen()
		}
		setIsFullscreen(!isFullscreen)
	}

	const customShapeUtils = [CardShapeUtil, SlideShapeUtil]
	const customTools = [CardShapeTool, SlideShapeTool]
	return (
		<div className="tldraw__editor-container">
			<button 
				onClick={toggleFullscreen}
				className="fullscreen-btn"
			>
				{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
			</button>
			<div className="tldraw__editor">
				<Tldraw
					// persistenceKey="slideshow_example"
					shapeUtils={customShapeUtils}
					tools={customTools}
					components={components}
					overrides={overrides}
					embeds={embedDefinitions}
				/>
			</div>
		</div>
	)
})

export default SlidesEditor