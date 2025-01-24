import { DefaultStylePanel, DefaultStylePanelContent, useEditor, useRelevantStyles } from 'tldraw'
import { urlStyle } from './url-style'

export function CustomStylePanel() {
  const editor = useEditor()
  const styles = useRelevantStyles()
  
  if (!styles) return null

  const url = styles.get(urlStyle)

  return (
    <DefaultStylePanel>
      <DefaultStylePanelContent styles={styles} />
      {url !== undefined && (
        <div style={{ padding: '8px' }}>
          <input
            type="url"
            style={{ width: '100%', padding: '4px' }}
            value={url.type === 'mixed' ? '' : url.value}
            onChange={(e) => {
              editor.markHistoryStoppingPoint()
              const value = urlStyle.validate(e.currentTarget.value)
              editor.setStyleForSelectedShapes(urlStyle, value)
            }}
            placeholder="Enter iframe URL"
          />
        </div>
      )}
    </DefaultStylePanel>
  )
}
