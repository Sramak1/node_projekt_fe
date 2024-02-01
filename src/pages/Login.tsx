import {SyntheticEvent, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";


const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [redirect,setRedirect] = useState(false);
    const [errorText,setErrorText] = useState('');

    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();
        const data = {
            email,
            "password":password
        };
        //console.log(data);
        const res = await axios.post('http://localhost:3000/auth/login',data,{withCredentials:true});
        //console.log(res);

        if(res.status == 201){
            setRedirect(true);
        }

        if(res.status != 201)
        {
            setErrorText('Napaka v podatkih');
        }

    }

    if(redirect){
        return <Navigate to={'/'}/>;
    }

  return(
      <>
          <main className="form-signin w-100 m-auto">
              <h2 className="error">{errorText}</h2>
              <form onSubmit={submit}>
                  <h1 className="h3 mb-3 fw-normal">Vpis</h1>
                  <div className="form-floating">
                      <input type="email" className="form-control" id="floatingInput"
                             placeholder="name@example.com"
                             onChange={(e)=>setEmail(e.target.value)}/>
                      <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                             onChange={(e)=>setPassword(e.target.value)}/>
                      <label htmlFor="floatingPassword">Geslo</label>
                  </div>
                  <button className="w-100 btn btn-lg btn-primary" type="submit">Vpis</button>
              </form>
          </main>
      </>
  )
}
export default Login;