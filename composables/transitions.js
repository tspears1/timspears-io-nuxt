const useTransitions = () => {

    const entranceTransitions = {
        'slide-up': { y: ['calc(100% + 0.25em)', 0], x: [0, 0] },
        'slide-down': { y: [ 'calc(-100% - 0.25em)', 0], x: [0, 0] },
        'slide-left': { x: ['calc(100% + 0.25em)', 0], y: [0, 0] },
        'slide-right': { x: ['calc(-100% - 0.25em)', 0], y: [0, 0] },
        'fade': { opacity: [0, 1] },
    }

    const exitTransitions ={
        'slide-up': { y: [0, 'calc(-100% - 0.25em)'] },
        'slide-down': { y: [0, 'calc(100% + 0.25em)'] },
        'slide-left': { x: [0, 'calc(-100% - 0.25em)'] },
        'slide-right': { x: [0, 'calc(100% + 0.25em)'] },
        'fade': { opacity: [1, 0] },
    }

    return { entranceTransitions, exitTransitions }
}

export { useTransitions }