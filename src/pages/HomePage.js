

//react function with export

import React ,{useEffect} from 'react'
import axios from "axios";
import Layout from "../components/Layout"

const HomePage = () => {

  // login user data
  const getUserData = async () =>
  {

try{
  const res = await axios.get('/api/v1/user/getUSerData', {},
  {
    headers:{
 
      Accept:'application/json',
      Authorization :"Bearer" + localStorage.getItem('token'),
 
    },

  });
}
catch(error)
{
  console.log(error.response.data);

}
  }
  useEffect (()=>
  {

    getUserData()
  }, [])

 
  return (
    <Layout>
     <h1>HomePage</h1>
    </Layout>
   
       
      
    
  );
};

export default HomePage