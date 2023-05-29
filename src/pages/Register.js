import React from 'react';
import "../styles/RegisterStyles.css";
import {Form,Input,message} from "antd";
import { useDispatch } from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice';


import  axios from "axios";
import { Link, useNavigate }  from "react-router-dom";


const Register = () => {
 const navigate = useNavigate();
 const dispatch =useDispatch();


    const onfinishHandler = async (values) =>{
try {
       dispatch(showLoading());

       const res = await axios.post('/api/v1/user/register', JSON.stringify(values),
       {
              headers:{
                     "Content-Type":'application/json'
              }
       }
       );
       dispatch(hideLoading());
       if(res.data.success)
       {
              message.success("Registered Successfully");
              navigate("/login");
       }
       else
       {
              message.error(res.data.message);
       }
}
    
    catch(error){
       dispatch(hideLoading());
       console.log(error.response.data)
message.error('Something went wrong')
    }
};
  return (

    <>
    <div className="form-container">
    <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
    <h3>Register Form</h3>
    <Form.Item label="Name" name="name">
        <Input type="text"/>
 </Form.Item>
 <Form.Item label="Email" name="email">
        <Input type="text"/>
 </Form.Item>
 <Form.Item label="Password" name="password">
        <Input type="password"/>
 </Form.Item>
 <Link to="/login" className="m-2">Already user logged in</Link>
 {/* m-s margin */}
 <button className="btn btn-primary" type="submit">
    Register
 </button>
 </Form>
</div></>

  )
}

export default Register