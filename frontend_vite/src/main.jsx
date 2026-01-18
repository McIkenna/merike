import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './api/store'
import { Provider } from 'react-redux'
import {
  ModuleRegistry,
  AllCommunityModule, // or AllEnterpriseModule
} from 'ag-grid-community';


import { ThemeToggleProvider } from './utils/ThemeToggleProvider.jsx'
ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById('root')).render(
  <ThemeToggleProvider>
    <Provider store={store}>
      <StrictMode>

        <App />
      </StrictMode>
    </Provider>
  </ThemeToggleProvider>,
)
