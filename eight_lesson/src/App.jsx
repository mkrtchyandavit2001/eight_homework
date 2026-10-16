import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
    .get("http://localhost:3004/users")
    .then(res => {
      setUsers(res.data)
      console.log(res.data);
    })
  }, [])
  const addItem = obj => {
    setUsers([...users, obj])
    toast.success("New User has been added successfully")
  }

  useEffect(() => {
    axios
    .delete("http://localhost:3004/users")
    .then(res => {
      setUsers(res.data)
      alert(res.data)
    })
  }, [])

  const handleDelete = id => {
    axios
    .delete("http://localhost:3004/users", id)
    .then(res => {
      setUsers(res.data)
      console.log(res.data.id);
      res.data.map(x => console.log(x.id))
    })
  }


  const handleUpSalary = data => {
    axios
    .put("http://localhost:3004/users", data)
    .then(res => {
      onUpSalary(res.data)
      alert(res.data)
    })
  }

  return (
    <div className='row'>
      <ToastContainer/>
      <AddUser
          onAdd = {addItem}
      />
      <UserList
        users = {users}
        onDelete = {handleDelete}
        onUpSalary = {handleUpSalary}
      />
    </div>
  )
}
export default App