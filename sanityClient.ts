import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: 'z0o6cgrz',
    dataset: 'production',
    apiVersion: '2023-03-20',
    useCdn: true,
})

const builder = imageUrlBuilder(client)

const urlFor = (source) => builder.image(source)

export { client, builder, urlFor }