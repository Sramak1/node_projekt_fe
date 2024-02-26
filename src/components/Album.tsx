import Task from "./Task.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Album = () => {
    const [card,setCard] = useState([]);
    const navigate = useNavigate();
    const getCard = async () =>{
        const getCat = await axios.get('http://localhost:3000/task/mostVoted');
        setCard(getCat.data);

    }
    useEffect(()=>{getCard()},[]);

    const handleSubmit=(event:any)=>{
        event.preventDefault();
        const search = event.target.search.value;
        if(search != "") {
            navigate(`/searchTask?q=${search}`);
        }
    }
    const getSearch = async (search:string)=>{
        const postSearch = await axios.post('http://localhost:3000/task/search', {search:search}, {withCredentials:true, headers:{"Content-Type":"application/json"}});
        console.log(postSearch);
    }
  return(
      <>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">
                    <form onSubmit={handleSubmit} method='POST'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:20}}>
                        <input name="search" style={{width:500, backgroundColor:"white", height:35, margin:10, color:"black"}} type="text" placeholder="Iskanje"/>
                             <button style={{backgroundColor:"gray"}} type="submit">Potrdi</button></div>
                    </form>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {card.map((task:any)=>{
                          return (<Task key={task.id} title={task.title} content={task.content} category={task.category.title} id={task.id} karma={task.karma}/>)
                      })}
                  </div>
              </div>
          </div>
      </>
  )
}
export default Album;