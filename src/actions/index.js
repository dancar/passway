export const setPasscode = (newPasscode) => {
  return {
    type: 'SET_PASSCODE',
    newPasscode
  }
}

export const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}
export const deleteItem = (index) => {
  return {
    type: 'DELETE_ITEM',
    index
  }
}

export const changeItem = (item, index) => {
  return {
    type: 'CHANGE_ITEM',
    item,
    index
  }
}
