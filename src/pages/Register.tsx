import {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import './Register.css';
import axios from 'axios';



const Register = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');

    const [errorText, setErrorText] = useState('');
    const [redirect,setRedirect]=useState(false);

    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();

        if(password1!=password2){
            setErrorText('Gesli se ne ujemata');
        }
        if(password1 == password2) {
            const data = {
                "first_name": firstName,
                "last_name": lastName,
                email,
                "password": password1
            };
            const res = await axios.post('http://localhost:3000/user', data);

            if (res.status != 201)
            {
                setErrorText('Napaka v registracijskih podatkih');
                console.log(res.data);
            }
            if(res.status == 201)
            {
                setRedirect(true);
            }
        }
    }

    if(redirect){
        return <Navigate to={'/login'}/>;
    }
  return(
      <>
          <main className="form-signin w-100 m-auto">
              <h2 className = "error">{errorText}</h2>
              <form onSubmit={submit}>
                  <h1 className="h3 mb-3 fw-normal">Registracija</h1>
                  <div className="form-floating">
                      <input type="text" className="form-control" id="floatingInput"
                             placeholder="Input your first name"
                             onChange={(e)=>setFirstName(e.target.value)}/>
                      <label htmlFor="floatingInput">Ime</label>
                  </div>
                  <div className="form-floating">
                      <input type="text" className="form-control" id="floatingInput"
                             placeholder="Imput your last name"
                             onChange={(e)=>setLastName(e.target.value)}/>
                      <label htmlFor="floatingInput">Priimek</label>
                  </div>
                  <div className="form-floating">
                      <input type="email" className="form-control" id="floatingInput"
                             placeholder="name@example.com"
                             onChange={(e)=>setEmail(e.target.value)}/>
                      <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                             onChange={(e)=>setPassword1(e.target.value)}/>
                      <label htmlFor="floatingPassword">Geslo</label>
                  </div>
                  <div className="form-floating">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                             onChange={(e)=>setPassword2(e.target.value)}/>
                      <label htmlFor="floatingPassword">Ponovite geslo</label>
                  </div>

                  <button className="w-100 btn btn-lg btn-primary" type="submit">Registracija</button>
              </form>
          </main>
      </>
  )
}
export default Register;