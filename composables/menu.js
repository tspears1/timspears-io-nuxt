const useMenu = () => {

    const menuOpen = useState('menuOpen', () => false)

    const openMenu = () => menuOpen.value = true

    const closeMenu = () => menuOpen.value = false

    const toggleMenu = () => menuOpen.value = !menuOpen.value

    watch(menuOpen, (value) => {
        document.querySelector('body').dataset.menuOpen = value
    })


    return {
        menuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
    }
}

export { useMenu }