import { Alert, AlertColor, Snackbar, SnackbarOrigin } from "@mui/material";
import { useEffect, useState } from "react";

export interface State extends SnackbarOrigin {
    open: boolean;
}

interface MessageShowProps {
    message:string;
    showMessage:boolean;
    type:AlertColor;
}

export default function MessageShow(props:MessageShowProps) {
  const {message, showMessage, type} = props;
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    setState({ ...state, open: showMessage });
  },[showMessage])
  
  const handleClose = () => {
    console.log("HANDLE");
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
    </Snackbar>
    </div>
  );
}