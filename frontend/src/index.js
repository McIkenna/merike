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

// Register the module
ModuleRegistry.registerModules([
  AllCommunityModule, // or AllEnterpriseModule
]);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)