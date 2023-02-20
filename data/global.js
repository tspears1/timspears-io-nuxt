const useGlobalData = () => {
    const { data } = useSanityQuery(groq`
        *[_type == "settings"]{
            siteEyebrow,
            siteTitle,
            navigation[] -> {
                title,
                "slug": slug.current
            }
        }[0]
    `)

    return { data }
}

export { useGlobalData }