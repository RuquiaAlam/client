import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from "axios";
import {useParams} from "react-router-dom"
import { DatePicker, TimePicker, message } from 'antd';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading ,showLoading} from '../redux/features/alertSlice';

// import dayjs from 'dayjs';

const Events = () => {
    const  { user } = useSelector(state => state.user)


    const [ doctors , setDoctors ] = useState([]);
    const params = useParams();
    const [date,setDate] = useState();
    const [time,setTime]= useState();
    const [isAvailable,setIsAvailable] = useState();
    const dispatch = useDispatch();
   
  
let momentOne = moment();
console.log(momentOne)


    // login user data
    const getUserData = async () =>
    {
  
  try{
    const res = await axios.post('/api/v1/doctor/getDoctorById',{ doctorId : params.doctorId},
    {
      headers:{
   
   
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
      setIsAvailable(true);
      if(!date && !time ){
         return alert ("date and Time required")
      }
dispatch(showLoading());
const res = await axios.post('/api/v1/user/book-events',
{

    doctorId : params.doctorId,
    userId : user._id,
    doctorInfo : doctors,
    userInfo : user,
    date : date,
    time : time
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


const handleAvailability =async() =>{

  try{
    dispatch(showLoading())
    const res = await axios.post( "/api/v1/user/booking-availability",
    {
      doctorId :params.doctorId,
      date:date,
      time:time
    },
    {
      headers:
      {
        Authorization:`Bearer ${ localStorage.getItem("token")}`
      }
    })
    dispatch(hideLoading());
    if(res.data.success)
    {
      setIsAvailable(true)
      message.success(res.data.message)

    }
    else
    {
       message.error(res.data.message)
    }

  }
  catch(error)
  {
    dispatch(hideLoading())
    console.log(error)
  }

}
    useEffect (()=>
    {
  
      getUserData();
      //eslint-disable-next-line
    }, [])
  
  return (
    <Layout>
   <h3>Booking Page</h3>
   < div className="container m-2">

        {doctors && (
            <>
  <h4>  {doctors.firstName} {doctors.lastName} </h4>
     <h4> Fees:${doctors.feesPerConsultation} </h4>
     <h4>
        Timings: {doctors.timings && doctors.timings[0]}- {" "}
        {doctors.timings && doctors.timings[1]} {" "}
        
     </h4>
     <div className="d-flex flex-column w-50">
        
<DatePicker className='m-2' format ="DD-MM-YYYY" onChange={
  (value)=> { setIsAvailable(false)  
   setDate(moment(value).format("DD-MM-YYYY"))}}/>
<TimePicker format="HH:mm" className="m-2"  onChange = {(value) => {
  setIsAvailable(false)
  setTime(moment(value).format("HH:mm"))}}/>

        <button className='btn btn-primary mt-2' onClick={handleAvailability}>
Check Availability
        </button>
      {!isAvailable &&   <button className='btn btn-dark mt-2' onClick = {handleEvents}>
Book Now
        </button>}
     </div>
            </>


)}
 
   
   </div>
    </Layout>
 
  );
}

export default Events