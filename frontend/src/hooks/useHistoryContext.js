
import { HistoryContext } from '../context/HistroyContext'
import { useContext } from 'react'

export const useHistoryContext = () => {
  const context = useContext(HistoryContext)

  if (!context) {
    throw Error('useHistoryContext must be used inside an HistoryContextProvider')
  }

  return context
}
