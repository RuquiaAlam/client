import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

import axios from "axios";
import {useParams} from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../../redux/features/alertSlice"
import moment from 'moment';



const Profile = () => {

  const {user} =useSelector(state=>state.user)
  const [doctor,setDoctor] = useState(null);
  const dispatch = useDispatch()
  const params = useParams();
  const navigate =useNavigate()

  
  // ==updatedoc===

  const handleFinish = async (values) => {
      

    try {
        dispatch(showLoading());
        const res = await axios.post('/api/v1/doctor/updateProfile', { ...values, userId: user._id ,
        timings:[
            moment(values.timings[0].format('HH:mm')),
            moment(values.timings[1].format('HH:mm'))

        ]
    },

            {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }
            })
        dispatch(hideLoading());

        if (res.data.success) {

            message.success(res.data.message);
            navigate("/")
        }
        else {
            message.error(res.data.success)
        }
    }
    catch (error) {

        dispatch(hideLoading());
        console.log(error);
        message.error("Something went wrong")

    }



  }
    // ==updatedoc===


  //getDoc details

  const getDoctorInfo = async  ()=>
  {
    try{
const res = await axios.post("/api/v1/doctor/getDoctorInfo", {userId : params.id},{
  headers:
  {
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
if(res.data.success){
  setDoctor(res.data.data)
}
    }
    catch(error)
    {
      console.log(error)

    }
  }
  
  useEffect(()=>
  {
    getDoctorInfo()
//eslint-disable-next-line

  },[])

  return (
    <Layout>
        <h1>Manage Profile </h1>
        { doctor && (
          <Form layout="vertical" onFinish = {handleFinish} className="m-3" initialValues={{...doctor,
            timings:[
            moment(doctor.timings[0],"HH:mm"),
            moment(doctor.timings[1],'HH:mm')
          ]}}>
          <h4 className="text">
              Personal Details
          </h4>
          <Row gutter={20}>


              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="First Name" name="firstName"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="first name" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Last Name" name="lastName"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="last name" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Phone" name="phone"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="phone" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Email" name="email"  required rules={[{ require: true }]}>
                      <Input type="text" placeHolder="email" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Website" name="website" required rules={[{ require: true }]}>
                      <Input type="text" placeholder="website" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Address" name="address" required rules={[{ require: true }]}>
                      <Input type="text" placeholder="address" />
                  </Form.Item></Col>


          </Row>


          <h4 className="text">
              Professional Details
          </h4>
          <Row gutter={20}>


              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Specialization" name="specialization"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="specialization" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Experience" name="experience"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="experience" />
                  </Form.Item></Col>
              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Fees Per Consultation" name="feesPerConsultation"  required rules={[{ require: true }]}>
                      <Input type="text" placeholder="feesPerConsultation" />
                  </Form.Item></Col>

              <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Timing" name="timings" >
                      <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>

                  <button className='btn btn-primary form-btn' type="Submit">
                      Update
                  </button>
              </Col>
          </Row>












      </Form>
        )}
    </Layout>
  )

        }

export default Profile