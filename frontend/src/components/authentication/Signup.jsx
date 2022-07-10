import React, {useState } from 'react';
import {FormControl, FormLabel, VStack, Input, Button, useToast} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const[show, setShow]=useState();
    const [name, setName]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [confirmpassword, setConfirmpassword]=useState();
    const [pic, setPic]=useState();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const Toast=useToast();
    const Details=(pics)=>{
      setLoading(true);
      if(pics===undefined)
      {
        Toast({
            title:"Please Select an Image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right"
        });
         setLoading(false);
        return;
      }
     if(pics.type=="image/jpeg" || pics.type=="pics/png")
     {
      const data=new FormData();
      data.append("file",pics);
      data.append("upload_preset","Web-Chat-App");
      data.append("cloud_name","kalpanakathait");
      fetch("https://api.cloudinary.com/v1_1/kalpanakathait/image/upload",{
        method:"post",
        body:data,
      }).then((res)=>res.json()).then((data)=>{
        setPic(data.url.toString());
        setLoading(false);
        console.log(data);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      })
     }
     else{
       Toast({
            title:"Please Select an Image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right"
        });
     }
    }
    const submitdetail=async()=>{
          setLoading(true);
          if(!name || !email || !password || !confirmpassword)
          {
            Toast({
              title:"Please fill all the fields.",
              status: "warning",
              duration: 5000,
             isClosable: true,
             position: "top-right"
            })
            return;
          }
          if(password!==confirmpassword)
          {
           Toast({
              title:"Password must be match.",
              status: "warning",
              duration: 5000,
             isClosable: true,
             position: "top-right"
            }) 
            return ;
          }
          setLoading(false);
          console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      Toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats",{ replace: true });
    } catch (error) {
      Toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    }
    return (
        <VStack spacing="10px">
        <FormControl>
          <FormLabel id='name' >Name</FormLabel>
          <Input  type="Name" placeholder='Enter your name' onChange={(e)=>setName(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel id='email'>Email</FormLabel>
          <Input  type="email" placeholder='Enter your Email' onChange={(e)=>setEmail(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <FormControl>
        <FormLabel id='password'>Password</FormLabel>
          <Input type={"password"} placeholder="Enter the Password" onChange={(e)=>setPassword(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <FormControl>
        <FormLabel id='confirm-password'>Confirm Password</FormLabel>
          <Input placeholder="Re-Enter the Password" onChange={(e)=>setConfirmpassword(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={(e)=>Details(
// @ts-ignore
        e.target.files[0])}/></FormControl>
        <Button colorScheme='green' width="100%" onClick={submitdetail} isLoading={loading}>Sign Up</Button>
        </VStack>
    );
}

export default Signup;
