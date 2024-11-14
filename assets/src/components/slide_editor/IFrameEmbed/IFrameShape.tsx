import { BaseShape } from '@tldraw/tldraw'

export type IframeShapeProps = {
  url: string
  w: number
  h: number
}

export class IframeShape extends BaseShape<IframeShapeProps> {
  static type = 'iframe'

  static props = {
    url: { type: 'string', default: 'https://www.google.com' },
    w: { type: 'number', default: 720 },
    h: { type: 'number', default: 500 },
  }

  static Component = ({ shape }: { shape: IframeShape }) => {
    const { url, w, h } = shape.props

    return (
      <div style={{ width: w, height: h, overflow: 'hidden', borderRadius: '8px', border: '1px solid #ccc' }}>
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        />
      </div>
    )
  }

  indicator(shape: IframeShape) {
    return {
      bounds: {
        x: 0,
        y: 0,
        width: shape.props.w,
        height: shape.props.h,
      },
      rotation: 0,
    }
  }
}

export const iframeShapeProps = {
  iframe: IframeShape,
}
