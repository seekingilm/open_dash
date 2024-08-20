import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

function Threats(){
  return(
   <Box
      component="form"
      sx={{
        width: '80ch'
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search For IP" variant="outlined" />
    </Box>
    
  );

}

export default Threats
