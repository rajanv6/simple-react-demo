import './css/App.css'
import UserForm from './components/UserForm'
import UsersPage from './components/UsersPage'
import './firebase/config'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'

function App() {
 
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<UserForm/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path="edit/:id" element={<UserForm/>}/>
      </Routes>
    </>
  )
}

export default App
