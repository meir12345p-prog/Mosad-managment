
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import AgentDashboard from '../../../new-server/mosad-managment/src/pages/Agent/AgentDashboard'
import AdminDashboard from '../../../new-server/mosad-managment/src/pages/Admin/AdminDashboard'
import AdminUsers from '../../../new-server/mosad-managment/src/pages/Admin/AdminUsers'
import AdminReports from '../../../new-server/mosad-managment/src/pages/Admin/AdminReports'
function App() {


  return (
  
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/agent/dashboard' element={<AgentDashboard/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route path='/admin/reports' element={<AdminReports/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
