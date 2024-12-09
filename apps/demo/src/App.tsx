import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTrans } from "./i18n";
import I18nSelector from "./i18n-selector";

function App() {
  const [count, setCount] = useState(0)
  // const {locale} = useLocale()
  const {t, locale} = useTrans()
  return (
    <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React + simple-typesafe-i18n ({locale()})</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            {t('count', count)}
          </button>
          <p>
            {t('edit')} <code>src/App.tsx</code>
            {t('save-test-hmr')}
          </p>
          <I18nSelector/>
        </div>
        <p className="read-the-docs">
          {t('learn-more')}
        </p>
    </>
  )
}

export default App
