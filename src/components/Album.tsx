import Task from "./Task.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import task from "./Task.tsx";
import {cardType} from "../models/cardType.ts";
import Welcome from "./Welcome.tsx";


const Album = () => {
    const [card,setCard] = useState([]);
    const [filterCheck,setFilterCheck] = useState([]);
    const navigate = useNavigate();
    const [category_id,setCategory] = useState(1);
    const [categories, setCategories] = useState([]);

    const getCard = async () =>{
        const getCat = await axios.get('http://localhost:3000/task/mostVoted');
        setCard(getCat.data);
        setFilterCheck(getCat.data);

    }
    useEffect(()=>{getCard()},[]);

    const getCategories = async () =>{
        const getCat = await axios.get('http://localhost:3000/categories');
        setCategories(getCat.data);
    }
    //ob zagonu spletne strani se sproži effect in požene funkcijo za pridobitev kategorij
    useEffect(()=>{getCategories()},[]);
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
const filterItems=(event:any)=>{
        const categoryName = event.target.value;

        const filterCat = filterCheck.filter((task:cardType)=>{
        if(task.category.title==categoryName)
        {
            return task;
        }
    })
    if(filterCat.length>0){
        setCard(filterCat);
    }
    else
    {
        setCard([]);
    }
    return filterCat;
}
const filterCreatedAt=async (event:any)=>{
        if(event.target.value=="desc")
        {
            const postNewest = await axios.get('http://localhost:3000/task/findNewest', {withCredentials:true, headers:{"Content-Type":"application/json"}});
            setCard(postNewest.data);
        }
        else
        {
            const postNewest = await axios.get('http://localhost:3000/task/findOldest', {withCredentials:true, headers:{"Content-Type":"application/json"}});
            setCard(postNewest.data);
        }
}
  return(
      <>
          <br/>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">
                    <form onSubmit={handleSubmit} method='POST'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:20}}>
                        <input name="search" style={{width:500, backgroundColor:"white", height:35, margin:10, color:"black"}} type="text" placeholder="Iskanje"/>
                             <button style={{backgroundColor:"gray"}} type="submit">Potrdi</button>
                        </div>
                        <div className="filterButtons" style={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:10}}>
                            <p style={{margin:10}}>Filtriraj:</p>
                            <select name="Kategorije" id="categoriesSelect" onChange={(event)=>filterItems(event)}>
                                {categories.map((catetegory:any,index:number)=>{
                                    return <option id={index.toString()}>{catetegory.title}</option>
                                })}

                            </select>
                            <select style={{margin:10}} onChange={(event)=>filterCreatedAt(event)} >
                                <option value="desc">Najnovejše</option>
                                <option value="asc">Najstarejše</option>
                            </select>
                            <button style={{backgroundColor:"gray",margin:10}} type="submit" onClick={()=>location.reload()}>Resetiraj</button>
                        </div>
                    </form>
                      {card.length>0?(
                          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                              {card.map((task:any)=>{
                                  return (<Task key={task.id} title={task.title} content={task.content} category={task.category.title} id={task.id} karma={task.karma}/>)
                              })}
                          </div>
                      ):(
                          <div>Nobenih opravil s to kategorijo</div>
                      )}
              </div>
          </div>
      </>
  )
}
export default Album;