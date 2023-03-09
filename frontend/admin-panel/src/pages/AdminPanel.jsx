import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import useLogout from '../hooks/useLogout';
import { Typography } from '@mui/material';
import axios from 'axios'

function AdminPanel() {
  const {logout} = useLogout()
  const handleLogout = async(event) => {
    event.preventDefault();
    logout()
  };


  useEffect(()=>{

  },[])
  return <div>
    <Typography component="h1" variant="h5">
            Admin Panel
    </Typography>
    <Button type="button" onClick={handleLogout} variant="contained" color="error">
      Log out
    </Button>
    </div>;
}

export default AdminPanel;
