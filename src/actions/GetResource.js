import axios from "axios"
import { useState } from "react";
import { getapi,header } from "../constant"

const getResource = async()=>{
  let resp=null;  
  let result=null;
  resp = await fetch(getapi,header)
  .then(response => response.json()).then(function(res){
    result =res
   });
  
  console.log("result "+result)
  return result;

}
export default getResource;