import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShopOwner from './components/ShopOwner'
import CustomersUi from './components/CustomersUi'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<ShopOwner />} />
          <Route path='/:id' element={<CustomersUi />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App