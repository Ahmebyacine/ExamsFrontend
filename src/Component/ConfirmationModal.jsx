import React from 'react';
import { 
  Dialog,
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography
} from '@mui/material';
import {useLanguage} from '../Contexts/LanguageContext'
export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor }) {
  const { t } = useLanguage();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <DialogTitle id="confirmation-dialog-title" style={{ padding: 0, marginBottom: '16px' }}>
        <Typography variant="h6" component="span" style={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Typography variant="body1" id="confirmation-dialog-description">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions style={{ padding: '16px 0 0 0', justifyContent: 'flex-end' }}>
        <Button 
          onClick={onClose} 
          style={{ 
            backgroundColor: '#e0e0e0', 
            color: '#000',
            textTransform: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            marginRight: '8px'
          }}
        >
          {t("Cancel")}
        </Button>
        <Button 
          onClick={onConfirm}
          style={{ 
            backgroundColor: confirmColor || '#0070f3', 
            color: 'white',
            textTransform: 'none',
            borderRadius: '6px',
            padding: '8px 16px'
          }}
        >
          {t(confirmText)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}