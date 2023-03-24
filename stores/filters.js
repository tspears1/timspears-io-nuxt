import { defineStore } from "pinia"

const useFilterStore = defineStore('filters', () => {
    // SELECTED FILTER =========================================
    const { serviceIcons } = useIcons()

    const selectedFilter  = ref('')
    const activeService = computed(() => serviceIcons.filter(icon => icon.slug == selectedFilter.value)[0] ?? null)
    const isService = computed(() => !!serviceIcons.filter(icon => icon.slug == selectedFilter.value).length )

    const resetFilter = () => selectedFilter.value = ''

    // CARD FILTERING ==========================================
    const { data } = useSanityQuery(groq`
        *[_type == 'page' && pageTemplate == 'works-template']{
            'cards': activeProjects[] -> {
                'url': 'work/' + slug.current,
                'image': cardImage.asset->,
                title,
                cardTitle,
                eyebrow,
                cardEyebrow,
                awarded,
                'services': projectSkills[] -> slug.current
            }
        }[0]
    `)

    const cards = computed(() => {
        const stack = data.value.cards.map(card => ({
            url: card.url,
            image: card.image,
            services: card.services,
            title: card.cardTitle ?? card.title,
            eyebrow: card.cardEyebrow ?? card.eyebrow,
            awarded: card.awarded,
        }))

        return selectedFilter.value == 'awarded'
            ? stack.filter(card => !!card.awarded)
            : isService.value
                ? stack.filter(card => card.services.includes( selectedFilter.value ))
                : stack
    })


    // MODAL ==================================================
    const { lockScreen, unlockScreen } = useScreenLock()
    const modalOpen = ref(false)

    const openModal = () => {
        lockScreen()
        modalOpen.value = true

    }
    const closeModal = () => {
        unlockScreen()
        modalOpen.value = false
    }

    const toggleModal = () => modalOpen.value = !modalOpen.value

    watch(modalOpen, (value) => {
        document.documentElement.dataset.modalOpen = value
    })

    watch(selectedFilter, () => {
        if (isService.value) {
            setTimeout(() => {
                closeModal()
                resetFilterScroll()
            }, 100)
        } else {
            resetFilterScroll()
        }
    })

    // SCROLL RESET ============================================
    const border = useState('frameBorder')
    const headerHeight = useHeaderHeight()
    const filterBarHeight = useFilterBarHeight()
    const scrollTopPadding = computed(() => border.value + headerHeight.value + filterBarHeight.value )

    const resetFilterScroll = () => {
        useState('lenis').value.scrollTo(
            '#filter-grid',
            { offset: scrollTopPadding.value * -1 }
        )
    }

    return {
        cards,
        closeModal,
        activeService,
        isService,
        modalOpen,
        openModal,
        resetFilter,
        resetFilterScroll,
        scrollTopPadding,
        selectedFilter,
        toggleModal,
    }
})

export { useFilterStore }
