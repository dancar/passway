import { combineReducers } from 'redux'

const passcode = (state = null , action) => {
  if (action.type === 'SET_PASSCODE') {
    return action.newPasscode
  }
  return state
}

const DEVELOPMENT_DATA = [
        {name: 'MOIS Standford MCI Whitehouse', value: '$400 million in gold bullion Gang SRI Cap-Stun Tehrik-i-Taliban Pakistan Homeland Defense Southwest Duress World News Transportation security cracking'},
        {name: 'Suicide attack Waco', value: ' Texas weapons of mass destruction halcon keyhole terrorist EO UT/RUS Attack SABC Screening IDP Trump M.P.R.I. Uzbekistan'},
        {name: 'China CDMA', value: 'clones Port Authority SAPO Cyber attack Environmental terrorist GIGN undercover Speakeasy Stranded sigvoice Bruxelles AQAP TSA'},
        {name: 'Great Item 1', value: '-890375258183733390'}
      ]

const items = (state = DEVELOPMENT_DATA, action) => {
  if (action.type === 'ADD_ITEM')
    return [...state, action.item]
  if (action.type === 'DELETE_ITEM')
    return state.filter((item, index) => index !== action.index)
  if (action.type === 'CHANGE_ITEM')
    return state.map((item, index) => {
      if (index === action.index)
        return action.item
      return item
    })
  return state
}

export default combineReducers({
  items, passcode
})
