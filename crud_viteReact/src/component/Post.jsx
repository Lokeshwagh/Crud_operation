import { getMethod,deletePost } from "../api/PostApi";
import { useEffect, useState } from "react";
import { Form } from "./Form";
export const Post=()=>{
    const [data,setdata]=useState([]);
      const getPostData=async()=>{
        const res=await getMethod();
      console.log(res.data);
      setdata(res.data);
    }

      useEffect(()=>{
        getPostData();
      },[]);

      const handleDeletePost=async(id)=>{
        try {
             const res=await deletePost(id);
             if(res.status===200){
                const newupdatePost=data.filter((currEle)=>{
                    return currEle.id!=id;
                });
                setdata(newupdatePost);
             }
             
        } catch (error) {
            console.log(err);
        }
          
                          
      }
      return(
        <>
        <section>
            <Form data={data} setdata={setdata}/>
        </section>
            <ul>{
                data.map((curEl)=>{
                    const{id,body,title}=curEl;
                    return(
                    <li key={id}>
                        <p>id:{id}</p>
                       <p>Title:{title}</p>
                       <p>Body:{body}</p>
                       <button>Edit</button>
                       <button onClick={()=>handleDeletePost(id)}>Delete</button> 

                    </li>
                    )
                })
                }
            </ul>
        </>
      )
};