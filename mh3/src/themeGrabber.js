import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import themeService from './services/theme-service'

const ThemeGrabber = ({ children }) => {
  const [theme, setTheme] = useState(null)
  useEffect(() => {
    async function getTheme() {
        setTheme(await themeService('brand1'))
      }
    getTheme()    
  })
  return theme && <ThemeProvider theme={theme}>{children}</ThemeProvider>
  //return <div></div>
}

export default ThemeGrabber