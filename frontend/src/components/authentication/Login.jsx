import React, {useState} from 'react';
import {FormControl, FormLabel, VStack, Input, Button, useToast} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
      const [email, setEmail]=useState();
      const [password,setPassword]=useState();
       const [loading,setLoading]=useState(false);
      const toast=useToast();
      const navigate=useNavigate();
    const submitdetail=()=>{
      setLoading(true);
      if(!email || !password)
          {
            toast({
              title:"Please fill all the fields.",
              status: "warning",
              duration: 5000,
             isClosable: true,
             position: "top-right"
            })
          setLoading(false);
            return;
          }
           try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // @ts-ignore
      const { data } =  axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
        navigate("/chats",{replace: true});
    } catch (error) {
      toast({
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
          <FormLabel id='email'>Email</FormLabel>
          <Input placeholder='Enter your name' type="email" width="100%" onChange={(e)=>setEmail(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <FormControl>
        <FormLabel id='passwordl'>Password</FormLabel>
          <Input placeholder="Enter the password" type="password" width="100%" onChange={(e)=>setPassword(
// @ts-ignore
          e.target.value)}/>
        </FormControl>
        <Button colorScheme='blue' width="100%" onClick={submitdetail}>Login</Button>
        <Button colorScheme='red' width="100%" >Get Guest User Credential</Button>
        </VStack>
    );
}

export default Login;
