const useArticleData = (slug) => {
    const { data } = useSanityQuery(groq`
        *[_type == 'article' && slug.current == "${slug}"]{
            title,
            slug,
            eyebrow,
            date,
            abstract,
        }[0]
    `)

    return { data }
}

export { useArticleData }