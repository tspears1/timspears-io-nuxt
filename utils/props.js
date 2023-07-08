import { list } from 'radash'

const propsArray = (value, length = 2) => is.arr(value) ? value : list(0, length - 1, value)

export { propsArray }