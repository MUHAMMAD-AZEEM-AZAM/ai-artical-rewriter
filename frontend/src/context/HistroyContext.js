import { createContext, useReducer } from 'react'

export const HistoryContext = createContext()

export const historyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY': 
      return {
        history: action.payload
      }
    case 'CREATEHISTORY':
      return {
        history: [action.payload, ...state.history]
      }
    case 'DELETEHISTORY':
      return {
        history: state.history.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, {
    history: null
  })

  return (
    <HistoryContext.Provider value={{...state, dispatch}}>
      { children }
    </HistoryContext.Provider>
  )
}