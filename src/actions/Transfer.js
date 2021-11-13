import axios from "axios"
import { transapi } from "../constant"

const Transfer =  (body)=>{
   
    let data=[];
    if(body){
      for(let i=0; i<body.length;i++){
        data[body[i].id]= body[i]
      }   
    }
    console.log(data)
    const response  = axios({
        method:"POST",
        url:transapi,
        data:data,
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }

    })
    return response;
}

export default Transfer;