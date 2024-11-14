import { useEffect, useState } from "react"
import { updatePost } from "../api/PostApi";
import { updateDataPosts } from "../api/PostApi";
import '../App.css';
export const Form=({data,setdata,updateData,setupdateData})=>{

    const [addData,setaddData]=useState({
        title:"",
        body:""
    });
    let isEmpty=Object.keys(updateData).length===0;
    useEffect(()=>{
             updateData && setaddData({
              title: updateData.title ||"",
              body : updateData.body || "",
             })
    },[updateData])
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
                     setaddData({title:"",body:""});
         }
    }
    const updateDataPost=async()=>{
        
      const res=await updateDataPosts(updateData.id,addData);
      setdata((prev)=>{
        return prev.map((currElement)=>{
          return currElement.id===res.data.id?res.data:currElement; 
        })
      });
      setaddData({title:"",body:""});
      setupdateData({});
      
    }
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const action=e.nativeEvent.submitter.value;
        if(action=="Add"){
           addPostData();
        }
       else{
        updateDataPost();
       }
        setaddData({title:"",body:""});
        
    }
  return(
    <>
    <center>
    
    <form onSubmit={handleFormSubmit}>
        <label htmlFor="title"></label>
         <input type="text"
                  autoComplete="off"
                  name="title"
                  id="title"
                  className="input"
                  placeholder="Add Title"
                  value={addData.title}
                  onChange={HandleInputForm}
           />
           <label htmlFor="body"></label>
           <input type="text"
                  autoComplete="off"
                  id="body"
                  name="body"
                  className="input"
                  placeholder="Add desription"
                  value={addData.body}
                  onChange={HandleInputForm}
           />  
           
           <button type="submit" class="button-75" role="button"  value={isEmpty? "Add":"Eit"}>{isEmpty?"Add":"Edit"}</button>  
    </form></center></>
  )
}