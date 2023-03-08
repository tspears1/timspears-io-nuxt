const usePortal = () => {
    const portalActive = useState('portalActive', () => false)

    const portalTiles = useState('portalTiles', () => [])

    const setPortalTiles = (payload) => portalTiles.value = payload


    return {
        portalActive,
        portalTiles,
        setPortalTiles,
    }

}