import { getMethod,deletePost } from "../api/PostApi";
import { useEffect, useState } from "react";
import { Form } from "./Form";
import '../App.css';
export const Post=()=>{
    const [data,setdata]=useState([]);
    const [updateData,setupdateData]=useState({});
      const getPostData=async()=>{
        const res=await getMethod();
      console.log(res.data);
      setdata(res.data);
    }

      useEffect(()=>{
        getPostData();
      },[]);
// for delete the post
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
      //  for update the post
      const handleUpdatePost=(curEl)=>{
                setupdateData(curEl);
      }
      return(
        <>
        <section>
            <Form data={data} setdata={setdata} updateData={updateData} setupdateData={setupdateData}/>
        </section>
            <ul className="ulList">{
                data.map((curEl)=>{
                    const{id,body,title}=curEl;
                    return(
                    <li key={id}>
                        <p>id:{id}</p>
                       <p>Title:{title}</p>
                       <p>Body:{body}</p>
                       <button onClick={()=>handleUpdatePost(curEl)} class="button-75" role="button"><span class="text">Edit</span></button>
                       <button onClick={()=>handleDeletePost(id)} class="button-75" role="button"><span class="text">Delete</span></button>
                    </li>
                    )
                })
                }
            </ul>
        </>
      )
};