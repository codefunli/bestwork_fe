import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
    title:string;
    content:string;
    noBtn:string;
    okBtn:string;
    isOpen:boolean;
    closeFunc:Function;
    okFunc:Function;
}

export default function AlertDialogSlide(props : AlertDialogSlideProps) {
    const { title, content, isOpen, closeFunc, okFunc, noBtn, okBtn } = props;
    const [open, setOpen] = useState(false);

    const handleOkFunc = () => {
      setOpen(false);
      okFunc();
    }

    const handleClose = () => {
        setOpen(false);
        closeFunc();
    };

    useEffect(() => {
        // do some checking here to ensure data exist
        if (isOpen) {
            // mutate data if you need to
            setOpen(isOpen);
        };
    }, [isOpen]);

    return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>{noBtn}</Button>
          <Button variant="contained" onClick={handleOkFunc}>{okBtn}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}