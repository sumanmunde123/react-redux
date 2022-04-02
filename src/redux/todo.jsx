import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addTodo } from "./action"


export const Todo =()=>{

  
    const [show,setshow]=useState(true)

    const [text, setText] = useState()
    const dispatch=useDispatch()
    const tododata = useSelector((store)=>store.todo)
    

    useEffect(()=>{
        getdata()
    },[])

    const getdata = ()=>{
        axios.get("http://localhost:8080/tdata").then(({data})=>{

        dispatch(addTodo(data))
           
          console.log(data,"data")

        })
    }

    const postdata = ()=>{
        
        axios.post("http://localhost:8080/tdata",{title:text,status:"uncompleted"}).then(()=>{
            getdata()
        })
    }
    const patchdata=(id,status)=>{
        if(status==="uncompleted"){status="completed"}
        else{status="uncompleted"}
        console.log(id,"patch")
        axios.patch(`http://localhost:8080/tdata/${id}`,{status}).then(()=>{
    getdata()})
    }



    const deleteGroce=(id)=>{

        const remove = tododata.filter((todo)=>{return todo.id !== id})
    
        axios.delete(`http://localhost:8080/tdata/${id}`).then(()=>{
            getdata();
        })
        dispatch(addTodo(remove)) 
        }

     

    return (
        <div>
            <input type="text" onChange={(e)=>setText(e.target.value)}/>
            <button onClick={postdata}>AddTodo</button>
            {tododata.map((e)=>{
              return  <div style={{display: 'flex', gap: '50px',justifyContent: 'center', margin: '30px'}}><Link to={`/tdata/${e.id}`}>{e.title}</Link>
              
              <button onClick={(() => { deleteGroce(e.id) })}>delete todo</button>
              <button onClick={(() => {patchdata(e.id,e.status) })}>status</button>
              {e.status}
              </div>

             })}
        </div>
    )
}