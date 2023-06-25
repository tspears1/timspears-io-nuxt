const useProjectData = (slug) => {
    const { data } = useSanityQuery(groq`
        *[_type == 'project' && slug.current == "${slug}"]{
            title,
            slug,
            client,
            year,
            eyebrow,
            'image': {
                'image': featuredImage.image.asset->,
                'fit': featuredImage.fit,
                'background': featuredImage.background,
            },
            theme,
            awarded,
            'services': projectSkills[] -> slug.current,
            'content': contentDesigner,
            overview,
        }[0]
    `)
    return { data }
}

export { useProjectData }