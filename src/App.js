import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setusers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setusers(data))
  }, [])




  const handleAdduser = event => {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email)
    const user = { name, email }

    // post data to server methode 
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setusers(newUsers)
        console.log(data)
      })
  }

  return (
    <div className="App">
      <h3>My Data: {users.length}</h3>
      <form onSubmit={handleAdduser}>
        <input type="text" name="name" id="" placeholder='Name' required />
        <input type="text" name="email" id="" placeholder='Email' required />
        <input type="submit" value="submit" />
      </form>

      <ul>
        {
          users.map(user => <li
            key={user.id}>
            id: {user.id}
            name:{user.name}
            email: {user.email}

          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
