import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', () => {
    // DATA ==================================================
    const { data: entryData } = useSanityQuery(groq`
        *[_type in ['home', 'page', 'project']]{
            _type,
            'slug': slug.current,
            'theme': pageTheme->slug.current
        }
    `)

    // STATE ==================================================
    const themeIndex = ref([])

    // UTILITY =================================================
    const getEntrySlug = (entry) => {
        switch (entry._type) {
            case 'index': return '/'
            case 'home': return '/'
                break
            case 'project': return `/work/${entry.slug}`
                break
            default: return `/${entry.slug}`
                break
        }
    }

    // METHODS ================================================

    const buildThemeIndex = () => {
        themeIndex.value = entryData.value.map((entry) => ({
                name: entry.slug ?? 'index',
                slug: getEntrySlug(entry),
                theme: entry.theme
        }))
    }

    const getEntryThemeIndex = (to) => {
        return themeIndex.value.filter(t => t.slug == to.path)[0]
    }

    return {
        themeIndex,
        buildThemeIndex,
        getEntryThemeIndex
    }
})

export { useThemeStore }


