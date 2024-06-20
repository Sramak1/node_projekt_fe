import {SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
const style = {
    height:"100%"
}
const CreateTask = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category_id,setCategory] = useState(1);

    const [errorText] = useState('');
    const [redirect,setRedirect] = useState(false);

    const [categories, setCategories] = useState([]);

    const getCategories = async () =>{
        const getCat = await axios.get('http://localhost:3000/categories');
        setCategories(getCat.data);
    }
    //ob zagonu spletne strani se sproži effect in požene funkcijo za pridobitev kategorij
    useEffect(()=>{getCategories()},[]);

    const submit = async (e:SyntheticEvent)=> {
        e.preventDefault();


        const data = {
            title,
            content,
            category_id,
        };
        console.log(data);
        const res = await axios.post('http://localhost:3000/task',data,{withCredentials:true});
        if(res.status == 200){
            setRedirect(true);
        }
        if(redirect){
            return <Navigate to={'/'}/>;
        }
        window.location.reload();
    }
  return(
      <>
          <main className="form-signin w-100 m-auto">
              <h2 className="error">{errorText}</h2>
              <form onSubmit={submit}>
                  <h1 className="h3 mb-3 fw-normal">Opravilo</h1>
                  <div className="form-floating">
                      <input type="text" className="form-control" id="floatingInput"
                             placeholder="Opravilo"
                             onChange={(e)=>setTitle(e.target.value)}/>
                      <label htmlFor="floatingInput">Title</label>
                  </div>
                  <div className="form-floating">
                      <select className="form-control" id="floatingSelect"
                              placeholder="Category"
                              onChange={(e)=>setCategory(e.target.value)}>
                          {categories.map((category:any)=>{
                              return(<option value={category.id} key={category.id}>{category.title}</option>)})
                          }
                      </select>
                      <label htmlFor="floatingSelect">Kategorija</label>
                  </div>
                  <div className="form-floating">
                      <textarea className="form-control" id="floatingContent" placeholder="Input content"
                                style={style}
                                rows = {10}
                                onChange={(e)=>setContent(e.target.value)}>
                      </textarea>
                      <label htmlFor="floatingContent">Navodilo</label>
                  </div>
                  <button className="w-100 btn btn-lg btn-primary" type="submit" style={{backgroundColor:"gray"}}>Shrani</button>
              </form>
          </main>
      </>
  )
}
export default CreateTask;