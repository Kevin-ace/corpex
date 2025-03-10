import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { api } from '../services/api';

interface OCRScannerProps {
  onScanComplete: (data: any) => void;
}

export function OCRScanner({ onScanComplete }: OCRScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsProcessing(true);
        try {
          const data = await api.processReceipt(acceptedFiles[0]);
          onScanComplete(data);
        } catch (error) {
          console.error('OCR processing failed:', error);
        } finally {
          setIsProcessing(false);
        }
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: 'background.default',
      }}
    >
      <input {...getInputProps()} />
      {isProcessing ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>Processing receipt...</Typography>
        </Box>
      ) : (
        <Typography>
          Drag & drop a receipt here, or click to select
        </Typography>
      )}
    </Box>
  );
} 