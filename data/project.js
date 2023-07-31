// Desc: Project data
const useProjectData = (slug) => {
    const { data } = useSanityQuery(groq`
        *[_type == 'project' && slug.current == "${slug}"]{
            title,
            heroSize,
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
            overview,
            'services': projectSkills[] -> slug.current,
            'content': contentDesigner[] {
                // Awards Block ====================================
                _type == 'awardsBlock' => {
                    _type,
                    'heading': sectionHeading,
                    'awards': awardsList[] {
                        _type,
                        'id': _key,
                        title,
                        subtitle,
                        competition,
                        presenter -> {
                            _type,
                            title,
                            logo,
                        },
                        relatedProject -> {
                            title,
                            'slug': slug.current,
                        },
                    }
                },

                // Gallery Block ====================================
                _type == 'galleryBlock' => {
                    _type,
                    'heading': sectionHeading,
                    'mediaGroup': mediaGroup[] {
                        _type,
                        'caption': caption,
                        'hotspot': hotspot,
                        'image': asset->
                    },
                },

                // Intro Block ====================================
                _type == 'projectIntro' => {
                    _type,
                    'heading': sectionHeading,
                    'eyebrow': sectionEyebrow,
                    button,
                    'content': contentSimple,
                    'layout' : select(
                        alignmentX  => 'columns-reverse',
                        !alignmentX => 'columns'
                    ),
                    'theme': select(
                        invertTheme  => 'dark',
                        !invertTheme => 'light'
                    ),
                },

                // Media Block ====================================
                _type == 'mediaBlock' => {
                    _type,
                    'heading': sectionHeading,
                    layout,
                    'media': mediaGroup[] {
                        _type,
                        'type': mediaType,
                        'caption': select(
                            mediaType == 'image' => media.caption,
                            mediaType == 'video' => video.caption,
                        ),
                        'attribution': select(
                            mediaType == 'image' => media.attribution,
                            mediaType == 'video' => video.attribution,
                        ),
                        'poster': video.poster.asset->,
                        'hotspot': media.hotspot,
                        'image' : media.asset->,
                        'video' : video.asset->,
                        'background': video.background,
                        spacing,
                        'ratio': select(
                            ratio == 'null' => null,
                            ratio != 'null' => ratio
                        ),
                    }
                },

                // Text Block ====================================
                _type == 'textBlock' => {
                    _type,
                    'heading': sectionHeading,
                    'spotlight': spotlightText,
                    'content': contentText,
                    'theme': select(
                        invertTheme  => 'dark',
                        !invertTheme => 'light'
                    ),
                },

                // Text w Heading Block ====================================
                _type == 'textHeadingBlock' => {
                    _type,
                    'eyebrow': sectionEyebrow,
                    'heading': sectionHeading,
                    'content': contentFull,
                    'layout' : select(
                        alignmentX  => 'columns-reverse',
                        !alignmentX => 'columns'
                    ),
                    'alignment': select(
                        alignmentY  => 'end',
                        !alignmentY => 'start'
                    ),
                    'theme': select(
                        invertTheme  => 'dark',
                        !invertTheme => 'light'
                    ),
                },
            },
        }[0]
    `)
    return { data }
}

export { useProjectData }