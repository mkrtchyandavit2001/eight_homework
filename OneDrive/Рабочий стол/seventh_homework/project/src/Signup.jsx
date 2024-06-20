import {useState} from "react"

export const Signup = ({onSign}) =>{

    const [user, setUser] = useState({id: "", name: "", surname: "", login: "", password: ""})
    const [error, setError] = useState("")
    const [done, setDone] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        if(!user.id.trim()){
            return setError('Please fill the id!')
        }
        if(!user.name.trim()){
            return setError('Please fill the name!')
        }
        if(!user.surname.trim()){
            return setError('Please fill the suename!')
        }
        if(!user.login.trim()){
            return setError('Please fill the login!')
        }
        if(!user.password.trim()){
            return setError('Please fill the password!')
        }
        if(user.login == /^[a-z0-9]+@mail\.com$/){
            return setError('Please fill correct login!')
        }
        if(user.password.length < 6){
            return setError('Password should be a little longer!')
        }
        onSign(user)
        setDone("")
        setUser({id: "", name: "", surname: "", login: "", password: ""})
        setError("")
        if(!error){
            return setDone("Everything is right:")
        }
    }
 
    return <div>
        <h1>Sign Up</h1>
        {error && <p style ={{color: "red"}}>{error}</p>}
        {done && <p style ={{color: "green"}}>{done}</p>}
        <form onSubmit = {handleSubmit}>
            <label>ID</label>
            <input type="number"
                value={user.id}
                onChange={e => setUser({...user, id:e.target.value})}
            />
                
            <label>Name</label>
            <input type="text"
                value={user.name}
                onChange={e => setUser({...user, name:e.target.value})}
            />

            <label>Surname</label>
            <input type="text"
                value={user.surname}
                onChange={e => setUser({...user, surname:e.target.value})}
            />

            <label>Login</label>
            <input type="text" 
                value={user.login}
                onChange={e => setUser({...user, login:e.target.value})}
            />

            <label>Password</label>
            <input type="text"
                value={user.password}
                onChange={e => setUser({...user, password:e.target.value})}
            />
           
            <button>Save</button>
        </form>
    </div>
}