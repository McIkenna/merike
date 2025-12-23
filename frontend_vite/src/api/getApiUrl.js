import React from 'react'


const config = {
  // API Settings
  apiUrl: import.meta.env.VITE_API_URL,
  apiVersion: import.meta.env.VITE_API_VERSION

};

export const getApiUrl = () => {
  return `${config.apiUrl}/${config.apiVersion}`;
};
