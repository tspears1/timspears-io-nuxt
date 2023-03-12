import { defineStore } from "pinia"

const useFilterStore = defineStore('filters', () => {

    const selectedFilter  = ref('')
    const modalOpen = ref(false)

    const openModal = () => modalOpen.value = true
    const closeModal = () => modalOpen.value = false
    const toggleModal = () => modalOpen.value = !modalOpen.value

    return {
        selectedFilter,
        modalOpen,
        openModal,
        closeModal,
        toggleModal,
    }
})

export { useFilterStore }
