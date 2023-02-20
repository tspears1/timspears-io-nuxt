const getTelephoneLink = (string) => 'tel:' + string.replace(/\(|\)/g, '').replace(/\s/g, '-')

const getTelephoneAria = (string) => string.replaceAll(/\(|\)/g, '').replaceAll(/\s|-/g, '.').replaceAll('', ' ').replaceAll(' .', '.')

export { getTelephoneLink, getTelephoneAria }
