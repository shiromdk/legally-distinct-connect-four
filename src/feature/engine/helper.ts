import { type Board } from './board'

export const copy2dArray = (array: Board): Board => {
  const newArray: Board = []

  for (let i = 0; i < array.length; i++) {
    const innerArray = array[i]
    const copiedInnerArray = [...innerArray] // Using the spread operator to copy the inner array
    newArray.push(copiedInnerArray)
  }
  return newArray
}
