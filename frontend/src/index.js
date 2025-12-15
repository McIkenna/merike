import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './api/store'
import { Provider } from 'react-redux'
import {
  ModuleRegistry,
  AllCommunityModule, // or AllEnterpriseModule
} from 'ag-grid-community';

import { lightTheme, darkTheme } from './utils/Themes'
import { ThemeProvider } from '@mui/material/styles';

// Register the module
ModuleRegistry.registerModules([
  AllCommunityModule, // or AllEnterpriseModule
]);
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>

    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)