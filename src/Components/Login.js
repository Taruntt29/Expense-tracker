import React,{Fragment,useState} from 'react'

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function sumitHandler(event){
        event.preventDefault();
        console.log(`Email:${email} and Password:${password}`);
    }

  return (
    <Fragment>
        <form onSubmit={sumitHandler}>
            <h1>Login</h1>
            <br/>
            <label>Email</label>
            <br/>
            <input type="email" value={email} placeholder="enter email" onChange={(event)=>{setEmail(event.target.value)}}/>
            <br/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" value={password} placeholder="enter password" onChange={(event)=>{setPassword(event.target.value)}}/>
            <br/>
            <br/>
            <button>Login</button>
        </form>
    </Fragment>
  )
}

export default Login