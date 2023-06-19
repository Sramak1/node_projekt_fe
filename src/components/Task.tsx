import {FC, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

interface Props{
    title:string,
    content:string,
    category:string,
    id:number
}
const Task:FC<Props> = ({title,content,category,id}) => {
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
    }

  return(
      <>
          <div className="col">
              <div className="card shadow-sm">
                  <h1>{title}</h1>
                  <p className="card-text">{category}</p>
                  <div className="card-body">
                      <p className="card-text">{content}</p>
                      <div className="d-flex justify-content-between align-items-center">
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>upvote(id)}>Vote
                              </button>
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