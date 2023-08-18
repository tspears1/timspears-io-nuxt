<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "page" && slug.current == 'about']{
        "pageTitle": title,
        eyebrow,
        heroSize,
        'content': contentDesigner[] {
            // Awards Block ====================================
            _type == 'awardsBlock' => {
                _type,
                'heading': sectionHeading,
                'theme': sectionTheme,
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

            // Headshot Block ====================================
            _type == 'headshotBlock' => {
                _type,
                'eyebrow': sectionEyebrow,
                'heading': sectionHeading,
                'content': contentFull,
                'headshot': headshot.asset->,
                'layout' : select(
                    alignmentX  => 'columns-reverse',
                    !alignmentX => 'columns'
                ),
                'theme': select(
                    invertTheme  => 'dark',
                    !invertTheme => 'light'
                ),
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

            // Services Block ====================================
            _type == 'servicesBlock' => {
                _type,
                'heading': sectionHeading,
                text,
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

useHead({
    title: 'About',
})

</script>

<template>
    <main class="page-wrapper">
        <Hero
            v-if="data"
            :title="data.pageTitle ?? null"
            :eyebrow="data.eyebrow"
            :hero-size="data?.heroSize || 'lg'"
        />
        <BlockDesigner
            v-if="data"
            :content="data.content"
        />
    </main>
</template>