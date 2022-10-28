import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Link, Redirect} from "react-router-dom";

function Register() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setRedirect(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (

    <div class="page">
  <div class="container">
    <div class="left">
      <div class="login"></div>
      <div class="eula"></div>
    </div>
    <div class="right">
      
      <form action="" onSubmit={e => registerUser(e)}>
      <div class="title">
      <h1>Create account</h1>
      </div>
      
        <label for="username">Username</label>
        <input className='input' type="text" placeholder="username"/>
        <label for="email">Email</label>
        <input className='input' type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <label for="password">Password</label>
        <input className='input' type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button class="btn" type="submit" id="submit" value="Submit">Отправить</button>
        <p className='title'>Already have an account?? <Link to='/login'>Sign In</Link></p>
      </form>
    </div>
  </div>
</div>
  );
}

export default Register;