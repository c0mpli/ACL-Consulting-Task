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

    const response = await axios('https://ACL-Consulting-Task.c0mpli.repl.co/auth/login',{"email":email,"password":password})
    const json = await response.json()

    if(!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if(response.ok){
      localStorage.setItem('user',JSON.stringify(json))
      dispatch({type:'LOGIN',payload:json})
      setIsLoading(false)
    }
  };
  return {login,isLoading,error}
}

export default useLogin;
