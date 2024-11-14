import axios from "axios";
const api=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
});

export const  getMethod=()=> {
    return api.get("/posts");
}
export const deletePost=(id)=>{
          return api.delete(`/posts/${id}`);
}
export const updatePost=(post)=>{
    return api.post('/posts',post); 
}

//put data
export const updateDataPosts=(id,post)=>{
    return api.put(`/posts/${id}`,post);
}