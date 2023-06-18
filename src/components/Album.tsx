import Task from "./Task.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

const Album = () => {
    const [card,setCard] = useState([]);

    const getCard = async () =>{
        const getCat = await axios.get('http://localhost:3000/task/mostVoted');
        setCard(getCat.data);

    }
    useEffect(()=>{getCard()},[]);
  return(
      <>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">

                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {card.map((task:any)=>{
                          return (<Task key={task.id} title={task.title} content={task.content} category={task.category.title} id={task.id}/>)
                      })}
                  </div>
              </div>
          </div>
      </>
  )
}
export default Album;