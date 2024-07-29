import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { url } from '../config/config'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${url}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // Save the userId to local storage
      localStorage.setItem('userId', json.otpResponse.data.userId);

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
