import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
  DialogProps
} from '@material-ui/core';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { JsxElement } from 'typescript';

type Props = {
  open: boolean;
  title: String | JsxElement;
  description?: String | JsxElement | null;
  onDelete: () => Promise<any> | Function;
  onClose: () => any;
};

const DeleteConfirmDialog: React.FC<Props & DialogProps> = ({
  open,
  title,
  description,
  onClose,
  onDelete,
  ...props
}) => {
  const { translate } = useLocales();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="secondary">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
          {translate('common.confirm')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
