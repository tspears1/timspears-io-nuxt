import { defineStore } from "pinia"

const usePortalStore = defineStore('portal', () => {

    const loadingScreenActive = ref(true)
    const siteLoaded = ref(false)
    const portalActive = ref(false)
    const transitionCompleted = ref(false)

    const transitionDone = () => transitionCompleted.value = true
    const transitionReset = () => transitionCompleted.value = false

    const isLoaded = () => siteLoaded.value = true

    watch(siteLoaded, (value) => {
        if (value == true) {
            document.documentElement.dataset.loaded = true
        }
    })

    watch(portalActive, (value) => document.documentElement.dataset.portalOpen = value )

    watch(transitionCompleted, (value) => document.documentElement.dataset.transitionComplete = value )

    return {
        loadingScreenActive,
        portalActive,
        isLoaded,
        transitionCompleted,
        transitionDone,
        transitionReset,
    }
})

const usePageContextStore = defineStore('pageContext', () => {

    const pageContext = reactive({
        next: {
            name: 'base',
            theme: 'base',
        },
        current: {
            name: '',
            theme: '',
        },
        prev: {
            name: '',
            theme: '',
        }
    })

    const updateContext = (key, entry) => {
        pageContext[key] = entry
    }

    const updateNextContext = (entry) => {
        pageContext.prev    = pageContext.current
        pageContext.current = pageContext.next
        pageContext.next    = entry
        console.warn('context updated: ', { pageContext })
        return pageContext
    }

    return {
        pageContext,
        updateContext,
        updateNextContext,
    }

})

export { usePortalStore, usePageContextStore }
