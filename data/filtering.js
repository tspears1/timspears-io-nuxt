const useFilterData = () => {
    const { data } = useSanityQuery(groq`
        *[_type == 'page' && pageTemplate == 'works-template']{
            'cards': activeProjects[] -> {
                'url': 'work/' + slug.current,
                'image': cardImage.asset->,
                'featuredImage': featuredImage.image.asset->,
                title,
                cardTitle,
                eyebrow,
                cardEyebrow,
                awarded,
                'services': projectSkills[] -> slug.current
            }
        }[0]
    `)

    return { data }
}

export { useFilterData }