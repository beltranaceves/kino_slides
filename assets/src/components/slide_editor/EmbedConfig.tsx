import { CustomEmbedDefinition, DEFAULT_EMBED_DEFINITIONS, DefaultEmbedDefinitionType } from 'tldraw'

// Keep only specific default embed types
const defaultEmbedTypesToKeep: DefaultEmbedDefinitionType[] = ['tldraw', 'youtube']
const defaultEmbedsToKeep = DEFAULT_EMBED_DEFINITIONS.filter((embed) =>
  defaultEmbedTypesToKeep.includes(embed.type)
)

// Custom embed definition for Livebook
const livebookEmbed: CustomEmbedDefinition = {
  type: 'livebook',
  title: 'Livebook',
  hostnames: ['livebook.dev', 'localhost'],
  minWidth: 300,
  minHeight: 300,
  width: 720,
  height: 500,
  doesResize: true,
  toEmbedUrl: (url) => {
    // const urlObj = new URL(url)
    // return `${urlObj.origin}${urlObj.pathname}/embed`
    const urlObj = new URL(url)
    const embedUrl = `${urlObj.origin}${urlObj.pathname}`
    
    // Inject JavaScript by appending it as a URL parameter
    const scriptToInject = encodeURIComponent(`
      for (const i = 0; i < 1000; i++) {
        console.log('Hello from Livebook!');
      }
      window.addEventListener('message', function(event) {
        if (event.data.type === 'kino_slides_command') {
          // Handle kino_slides specific commands
          console.log('Received command:', event.data);
        }
      });
    `)
    
    return `${embedUrl}?inject_js=${scriptToInject}`
  },
  fromEmbedUrl: (url) => {
    const urlObj = new URL(url)
    return url.replace('/embed', '')
  },
  icon: 'https://livebook.dev/images/logo.png',
}

// Export combined embed definitions
export const embedDefinitions = [...defaultEmbedsToKeep, livebookEmbed]
