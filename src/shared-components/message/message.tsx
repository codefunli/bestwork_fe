import { Snackbar, SnackbarOrigin } from "@mui/material";
import { useEffect, useState } from "react";

export interface State extends SnackbarOrigin {
    open: boolean;
}

interface MessageShowProps {
    message:string;
    showMessage:boolean;
}

export default function MessageShow(props:MessageShowProps) {
  const {message, showMessage} = props;
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
}