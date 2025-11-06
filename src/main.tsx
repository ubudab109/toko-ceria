import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./stores/index.ts";
import './index.css';
import App from './App.tsx';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#AA8844] border-t-transparent rounded-full animate-spin"></div>
          </div>
        } persistor={persistor}>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
