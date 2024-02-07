import {FC, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";

interface Props{
    title:string,
    content:string,
    category:string,
    id:number,
    karma:number
}
const Task:FC<Props> = ({title,content,category,id,karma}) => {
    const [redirect,setRedirect] = useState(false);
    const upvote = async (taskId:number)=>{
        const res = await axios.post(`http://localhost:3000/vote/upvote/${taskId}`,taskId,{withCredentials:true});
        console.log(res);
    }
    const deleteFunction = async (taskId:number) =>{
        const res = await axios.delete(`http://localhost:3000/task/${taskId}`,{withCredentials:true});
        console.log(res);
        if(res.status == 201){
            setRedirect(true);
        }
        if(redirect){
            return <Navigate to={'/'}/>;
        }
        window.location.reload();
    }

  return(
      <>
          <div className="col">
              <div style={{backgroundColor:"lightgray"}} className="card shadow-sm">
                  <h1 style={{fontFamily:"Gill Sans", textAlign:"center"}}>{title}</h1>
                  <p style={{fontSize:"20px"}} className="card-text">Kategorija: {category}</p>
                  <p style={{fontSize:"20px"}} className="card-text">Glasovi: {karma}</p>
                  <hr></hr>
                  <div className="card-body">
                      <p style={{fontSize:"20px", textAlign:"center"}} className="card-text">{content}</p>
                      <div className="d-flex justify-content-between align-items-center">
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>upvote(id)}>Vote
                              </button>
                          <Link to={"/update"} state={{data:id}}><button type="button" className="btn btn-sm btn-outline-secondary">Edit</button></Link>
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>deleteFunction(id)}>Delete
                              </button>
                      </div>
                  </div>
              </div>
          </div>
      </>

  )
}
export default Task;