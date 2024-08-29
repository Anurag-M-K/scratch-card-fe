import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShopOwner from './components/ShopOwner'
import CustomersUi from './components/CustomersUi'
import Login from './components/Login'
import ProtectedRouteStore from './components/ProtextedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}

          <Route path='/' element={<ProtectedRouteStore><ShopOwner /></ProtectedRouteStore>} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<CustomersUi />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App