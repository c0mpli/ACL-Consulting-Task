import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import useLogout from '../hooks/useLogout';
import { Typography } from '@mui/material';
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function AdminPanel() {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const [data,setData] = useState()
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [model, setModel] = useState('');
  const [userId, setUserId] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);




  const handleLogout = async(event) => {
    event.preventDefault();
    logout()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async() => {
    if(!userId){
      alert("Please enter userId")
      return
    }
    const response = await axios.post('https://acl-consulting-task.c0mpli.repl.co/admin/update',{
      "userId":userId,
      "isSubscribed":isSubscribed,
      "frequency":frequency,
      "model":model
    },{headers:{"Authorization":`Bearer ${user}`}})
    .catch(error=>alert(error.response.data.message))

    
    if(await response.status===201)
    setOpen(false);

  };

  async function getData(){
    const repsonse = await axios.get('https://acl-consulting-task.c0mpli.repl.co/admin/userdata',{headers:{"Authorization":`Bearer ${user}`}})
    setData(await repsonse.data)
  }

  useEffect(()=>{
    getData()    
  },[])

  return <div>
    <Typography component="h1" variant="h5">
            Admin Panel
    </Typography>
    {
      data && (<TableContainer component={Paper} sx={{margin:"1.5rem 0"}}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Username</TableCell>
              <TableCell align='right'>Subscribed</TableCell>
              <TableCell align='right'>Frequency</TableCell>
              <TableCell align='right'>Model</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value) => (
              <TableRow
                key={value.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{value.userId}</TableCell>
                <TableCell component="th" scope="row">
                  {value.name}
                </TableCell>
                <TableCell align='right'>{value.username?value.username:"null"}</TableCell>
                <TableCell align='right'>{value.isSubscribed?<CheckIcon />:<CloseIcon />}</TableCell>
                <TableCell align='right'>{value.frequency}</TableCell>
                <TableCell align='right'>{value.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>)
    }
    <Button type="button" variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
    <Button type="button" onClick={handleLogout} variant="contained" color="error">
      Log out
    </Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="userId"
            type="text"
            fullWidth
            variant="standard"
            value={userId}
            onChange={(e)=>{setUserId(e.target.value)}}
            required
          />
          <FormControlLabel control={<Checkbox onChange={()=>{setIsSubscribed(isSubscribed?false:true)}} value={isSubscribed}/>} label="Subscribed" />
          <Box sx={{display:"flex"}}>

          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={frequency}
          label="Frequency"
          onChange={(e)=>{setFrequency(e.target.value)}}
          >
          <MenuItem value={"hourly"}>Hourly</MenuItem>
          <MenuItem value={"daily"}>Daily</MenuItem>
        </Select>
      </FormControl>


          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={model}
          label="Model"
          onChange={(e)=>{setModel(e.target.value)}}
          >
          <MenuItem value={"iphone 11"}>Iphone 11</MenuItem>
          <MenuItem value={"iphone 12"}>Iphone 12</MenuItem>
          <MenuItem value={"iphone 13"}>Iphone 13</MenuItem>
          <MenuItem value={"iphone 14"}>Iphone 14</MenuItem>

        </Select>
      </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>;
}

export default AdminPanel;
