import { defineStore } from "pinia";

export const usePortalStore = defineStore('portal', () => {
    const portalTiles = ref([])
    const portalActive = ref(false)

    return {
        portalTiles,
    }
})