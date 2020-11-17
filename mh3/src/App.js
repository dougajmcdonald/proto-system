import React, { useEffect, useState } from 'react'
import './App.css';
import themeService from './services/theme-service'
import { ThemeProvider } from 'styled-components'
import StyledButton from './Button'
import { Button } from 'lantern'

function App() {

  const [theme, setTheme] = useState(null)
  const [brand, setBrand] = useState('brand1')

  useEffect(() => {
    async function getTheme() {
        setTheme(await themeService(brand))
      }
    getTheme()    
  }, [brand])

  return (
    theme && <ThemeProvider theme={theme}>
      <div className="App">      
        <header className="App-header">
          <p>These are some local components using a theme, which you can change</p>
          <StyledButton onClick={() => setBrand('brand1')}>Brand 1</StyledButton>
          <StyledButton onClick={() => setBrand('brand2')}>Brand 2</StyledButton>

          <p>These buttons are imported from a separate npm package but share the same theme</p>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='tertiary'>Tertiary</Button>

        </header>      
      </div>
    </ThemeProvider>
  );
}

export default App;
