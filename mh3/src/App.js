import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import themeService from './services/theme-service'
import { ThemeProvider } from 'styled-components'
import StyledButton from './Button'

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
          <StyledButton onClick={() => setBrand('brand1')}>Brand 1</StyledButton>
          <StyledButton onClick={() => setBrand('brand2')}>Brand 2</StyledButton>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>      
      </div>
    </ThemeProvider>
  );
}

export default App;
