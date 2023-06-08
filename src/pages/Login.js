import React from 'react';
import {Form,Input,message} from "antd";
import {useDispatch} from "react-redux";
import {showLoading,hideLoading} from "../redux/features/alertSlice";


import {Link,useNavigate} from "react-router-dom";
//useNavigate hook
import axios from"axios";

const Login = () => {

  const navigate = useNavigate();
  const dispatch =useDispatch();

  const onfinishHandler= async (values) =>
  {
//network req based on axios
    try{
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login",values);
      

      // {

      //        headers:{
      //               "Content-Type":'application/json'
      //        }
      // }
      // );
      window.location.reload();

dispatch(hideLoading());
      if(res.data.success){
        //token variable
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful" );
        navigate("/");

      }
      else
      {
message.error(res.data.message);
      }
    }
    catch(error)
    {
      dispatch(hideLoading());
      console.log(error.response.data);
      message.error("Something went wrong")
;
    }
  }
  return (
    <div>
      
      <div className="form-container">
    <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
    <h3 className='text-center'>Login Form</h3>
   
 <Form.Item label="Email" name="email">
        <Input type="text"/>
 </Form.Item>
 <Form.Item label="Password" name="password">
        <Input type="password"/>
 </Form.Item>
 <Link to="/register" className="m-2">Not a  user register here</Link>
 {/* m-s margin */}
 <button className="btn btn-primary" type="submit">
    Login
 </button>
 </Form>
</div>
    </div>
  )
}

export default Login