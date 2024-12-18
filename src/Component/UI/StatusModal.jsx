import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box
} from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useLanguage } from '../utils/LanguageContext';

export default function StatusModal({ type, title, message, isOpen, onClose }) {
  const { t } = useLanguage();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="status-dialog-title"
      aria-describedby="status-dialog-description"
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <DialogTitle id="status-dialog-title" style={{ padding: 0, marginBottom: '16px' }}>
        <Box display="flex" alignItems="center">
          {type === 'success' ? (
            <CheckCircleOutline style={{ color: '#4bb543', marginRight: '12px' }} />
          ) : (
            <ErrorOutline style={{ color: '#f44336', marginRight: '12px' }} />
          )}
          <Typography variant="h6" component="span" style={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Typography variant="body1" id="status-dialog-description" style={{ marginBottom: '24px' }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions style={{ padding: 0, justifyContent: 'flex-end' }}>
        <Button 
          onClick={onClose} 
          style={{ 
            backgroundColor: '#0070f3', 
            color: 'white',
            textTransform: 'none',
            borderRadius: '6px',
            padding: '8px 16px'
          }}
        >
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}