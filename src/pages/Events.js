import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from "axios";
import {useParams} from "react-router-dom"
import { DatePicker, TimePicker, message } from 'antd';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading ,showLoading} from '../redux/features/alertSlice';

import dayjs from 'dayjs';

const Events = () => {
    const {user} =useSelector((state)=> state.user)


    const [ doctors , setDoctors ] = useState([]);
    const params = useParams();
    const [date,setDate] = useState();
    const [time,setTime]= useState();
    const [isAvailable,setIsAvailable] = useState()
    const dispatch =useDispatch();


    // login user data
    const getUserData = async () =>
    {
  
  try{
    const res = await axios.post('/api/v1/doctor/getDoctorById',{ doctorId : params.doctorId},
    {
      headers:{
   
        Accept:'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
   
      },
  
    });
    if(res.data.success){
      setDoctors(res.data.data);
    }
  }
  catch(error)
  {
    console.log(error);
  
  }
    }
  

    // ====events function=======
const handleEvents = async ()=>
{
    try{
dispatch(showLoading());
const res = await axios.post('/api/v1/user/book-events',
{

    doctorId:params.doctorId,
    userId:user._id,
    doctorInfo:doctors,
    userInfo:user,
    date:date,
    time:time,



},
{
    headers:{
  

        Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
})
dispatch(hideLoading())
if(res.data.success)
{
    message.success(res.data.message)

}


    }
    catch(error)
    {
        dispatch(hideLoading())
        console.log(error)
       
}
}

        // ====events function=======



    useEffect (()=>
    {
  
      getUserData();
      //eslint-disable-next-line
    }, [])
  
  return (
    <Layout>
   <h3 className='heading m-3'>Events</h3>
   < div className="container">

        {doctors && (
            <>
  <h4>  {doctors.firstName} {doctors.lastName} </h4>
     <h4> Fees:${doctors.feesPerConsultation} </h4>
     <h4>
        Timings: {doctors.timings && doctors.timings[0]}- {""}
        {doctors.timings && doctors.timings[1]} {""}
        
     </h4>
     <div className="d-flex flex-column w-50">
        
<DatePicker className='m-2' format ="DD-MM-YYYY" onChange={(value)=> setDate(moment(value).format("DD-MM-YY"))}/>
<TimePicker format="HH:mm" className="m-2"  onChange = {(value) => setTime(moment(value).format("HH:mm"))}/>

        <button className='btn btn-primary mt-2'>
Check Availability
        </button>
        <button className='btn btn-dark mt-2' onClick = {handleEvents}>
Book Now
        </button>
     </div>
            </>


)}
 
   
   </div>
    </Layout>
 
  );
}

export default Events