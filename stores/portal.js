import { defineStore } from "pinia"

const usePortalStore = defineStore('portal', () => {

    const portalActive = ref(false)
    const transitionCompleted = ref(false)

    const transitionDone = () => transitionCompleted.value = true
    const transitionReset = () => transitionCompleted.value = false

    watch(portalActive, (value) => {
        document.documentElement.dataset.portalOpen = value
    })

    return {
        portalActive,
        transitionCompleted,
        transitionDone,
        transitionReset,
    }
})

const usePageContextStore = defineStore('pageContext', () => {

    const pageContext = reactive({
        next: {
            name: '',
            theme: '',
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



//TODO:
//  get page context for next page
//  lock screen if not already locked
//  transition grid enter
//  If menu open, reset menu (no animation)
//  update theme
//  swap pages
//  transition grid exit
//  trigger hero animations
//  update page context (next="null", current="next", prev="current")