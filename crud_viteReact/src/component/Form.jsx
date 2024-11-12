import { useState } from "react"
import { updatePost } from "../api/PostApi";


export const Form=({data,setdata})=>{

    const [addData,setaddData]=useState({
        title:"",
        body:""
    });
    const HandleInputForm=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setaddData((prev)=>{
                return{
                    ...prev,
                    [name]:value,
                }
        });
    };
    const addPostData=async()=>{
         const res=await updatePost(addData);
         console.log(res)
         console.log(res);
         if(res.status===201){
                     setdata([...data,res.data]);
         }
    }
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        addPostData();
        setaddData({title:"",body:""})
    }
  return(
    <>
    <form onSubmit={handleFormSubmit}>
        <label htmlFor="title"></label>
         <input type="text"
         autoComplete="off"
         name="title"
         id="title"
         placeholder="Add Title"
         value={addData.title}
           onChange={HandleInputForm}
           />
           <label htmlFor="body"></label>
           <input type="text"
           autoComplete="off"
           id="body"
           name="body"
           placeholder="Add desription"
           value={addData.body}
           onChange={HandleInputForm}
           />  
           <button type="submit">Add</button>      
    </form></>
  )
}