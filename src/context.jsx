import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const getInitialDarkMode = () => {
  const preferesDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches

  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'

  return storedDarkMode || preferesDarkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkThem = !isDarkTheme
    setIsDarkTheme(newDarkThem)
    localStorage.setItem('darkTheme', newDarkThem)
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
