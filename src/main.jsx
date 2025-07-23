import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './routes/Home'
import CreateEventRoute from './routes/CreateEvent'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateEventRoute />} />
    </Routes>
  </BrowserRouter>,
)
