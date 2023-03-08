import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setIsLoading(true);
    setError(null);
  };
}

export default useLogin;
