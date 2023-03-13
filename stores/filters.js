import { defineStore } from "pinia"

const useFilterStore = defineStore('filters', () => {

    const { isLocked } = useScreenLock()

    const selectedFilter  = ref('')
    const modalOpen = ref(false)

    const openModal = () => modalOpen.value = true
    const closeModal = () => modalOpen.value = false
    const toggleModal = () => modalOpen.value = !modalOpen.value

    watch(modalOpen, (value) => {
        document.documentElement.dataset.modalOpen = value
        isLocked.value = value
    })

    return {
        selectedFilter,
        modalOpen,
        openModal,
        closeModal,
        toggleModal,
    }
})

export { useFilterStore }
