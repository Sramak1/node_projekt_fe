import Task from "../components/Task.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {cardType} from "../models/cardType.ts";
const SearchTask =()=>{
    const [card,setCard] = useState<cardType[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get('q');
    console.log(searchValue);
    const getSearch = async (search:string)=>{
        const postSearch = await axios.post('http://localhost:3000/task/search', {search:search}, {withCredentials:true, headers:{"Content-Type":"application/json"}});
        console.log(postSearch);
        setCard(postSearch.data);
    }
    console.log(card[0]?.title);
    useEffect(()=>{
        getSearch(searchValue!)},[]);
    return <>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {card && card.length>0 ? (
                <>
                    <div>
                    {Object.values(card)?.map((task:cardType)=>(
                        <><Task key={task.id} title={task.title}  content={task.content} category={task.category.title} id={task.id} karma={task.karma}/></>
                    ))}</div>
                </>
            ):(
                <>
                <div><p>asd</p></div>
                </>
            )}
        </div>

    </>
}
export default SearchTask;