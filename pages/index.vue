<script setup>
const { data } = useSanityQuery(groq`
    *[_type == "home"]{
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

            // Featured Project Block ====================================
            _type == 'featuredBlock' => {
                _type,
                'project': project -> {
                    title,
                    'slug': slug.current,
                    'media': {
                        'image': featuredImage.image.asset->,
                        'fit': featuredImage.fit,
                        'background': featuredImage.background,
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

            // Tool Block ====================================
            _type == 'toolBlock' => {
                _type,
                'theme': sectionTheme,
                eyebrow,
                'heading': sectionHeading,
                'tools': tools[] {
                    _type,
                    'id': _key,
                    library,
                    label,
                    description,
                }
            },
        },
    }[0]
`)

useHead({
    title: 'Home',
})

</script>

<template>
    <main class="page-wrapper">
        <Hero
            v-if="data"
            :title="data.pageTitle ?? null"
            :billboard="true"
            :eyebrow="data.eyebrow"
            :hero-size="data?.heroSize || 'lg'"
        />
        <section class="section philosophy-block" section-theme="dark">
            <div class="section__content philosophy-block__content">

            </div>
        </section>
        <BlockDesigner
            :content="data?.content ?? []"
            v-if="data"
        />
    </main>
</template>