import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios'

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post('https://acl-consulting-task.c0mpli.repl.co/auth/login',{"email":email,"password":password})
    const json = await response.data.token
    console.log(json)
    console.log(response)

    if(response.status!=201){
      setIsLoading(false)
      setError(json.error)
    }
    if(response.status===201){
      localStorage.setItem('user',JSON.stringify(json))
      dispatch({type:'LOGIN',payload:json})
      setIsLoading(false)
    }
  };
  return {login,isLoading,error}
}

export default useLogin;
