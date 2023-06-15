import { bold } from 'colors';
import React from 'react'
import {useNavigate} from "react-router-dom"

const DoctorList = ({doctor}) => {
    const navigate =useNavigate();

  return (
   <>
   <div className="card m-2 " style ={{cursor:"pointer" ,width:"240px", height:"220px"}} onClick ={( ) =>  navigate(`/doctor/book-events/${doctor._id}`)}>
    <div className="card-header" >
        {doctor.firstName} {doctor.lastName}
    </div>
    <div className="card-body ">
        <p>
            <b>Specialization:</b>
            {doctor.specialization}
        </p>
        <p>
            <b>Experience:</b>
            {doctor.experience}years
        </p>
        <p>
            <b>Fees per Consultation:</b>
            Rs.{doctor.feesPerConsultation}
        </p>
        <p>
            <b>Timings:</b>
             {doctor.timings[0]}AM -{doctor.timings[1]}PM
        </p>
    </div>
   </div>

   </>
  );
};

export default DoctorList