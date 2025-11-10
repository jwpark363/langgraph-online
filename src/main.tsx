import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import App from './App.tsx'

const GlobalStyle = createGlobalStyle`
  ${reset}

  /* Add your custom global styles below */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #f9f9f9;
    color: #666;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
)
