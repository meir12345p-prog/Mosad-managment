import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import AgentDashboard from './pages/Agent/AgentDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminReports from './pages/Admin/AdminReports'
import MyReports from './pages/Agent/AgentReports'
import AgentAddReports from './pages/Agent/AgentAddReports'
import AgentCsvUpload from './pages/Agent/AgentCsvUpload'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/agent/dashboard' element={<AgentDashboard/>}/>
        <Route path='/agent/my' element={<MyReports/>}/>
        <Route path='/agent/reports' element={<AgentAddReports/>}/>
        <Route path='/agent/reports/csv' element={<AgentCsvUpload/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route path='/admin/reports' element={<AdminReports/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
