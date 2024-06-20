import { useState } from 'react'
import './App.css'
import { Signup } from './Signup'

function App() {
  const [users, setUsers] = useState([
    {id: 101, name: "Ashot", surname: "Karapetyan", login: "ashot@mail.com", password:"ash456"},
    {id: 102, name: "Narek", surname: "Hayrapetyan", login: "narek@mail.com", password:"narek111"},
    {id: 103, name: "Karen", surname: "Sargsyanyan", login: "karen@mail.com", password:"kar123"},
    {id: 104, name: "Hayk", surname: "Simonyan", login: "hayk@mail.com", password:"hayk555"},
  ])


  const signup = obj =>  {

    if(users.map(x => x.login !== obj.login)){
      setUsers([...users, {...obj}])
    }
  }

  return (
    <>
      <Signup onSign = {signup} />
    </>
  )
}

export default App
