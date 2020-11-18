import React, { useEffect, useState } from 'react'
import themeService from './services/theme-service'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import StyledButton from './components/Button'
import { Button } from 'lantern'

/**
 * This allows us to apply across the app our global or base styles to avoid needing to redefine everything
 * explicitely within each component (either local or from system)
 * This would likely be an approach we could use to replace the default sass styles in mh2 at the moment
 */
const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.color.font.body};
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.color.font.heading};
  }
  p {
    color: ${({ theme }) => theme.color.font.body};
  }
`

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
      <GlobalStyle />
      <div className="App">      
        <header className="App-header">
          <h1>Proof of concept super mega app</h1>
          <h2>Internal components</h2>
          <p>These are some local components using a theme, which you can change</p>
          <StyledButton onClick={() => setBrand('brand1')}>Brand 1</StyledButton>
          <StyledButton onClick={() => setBrand('brand2')}>Brand 2</StyledButton>

          <h2>External components</h2>
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
