import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { formatCurrency } from '../utils/formatters';

interface MpesaPaymentProps {
  amount: number;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}

export function MpesaPayment({ amount, onSuccess, onCancel }: MpesaPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'input' | 'processing' | 'confirmation'>('input');

  const handleSubmit = async () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate M-Pesa STK push
    setTimeout(() => {
      setStep('confirmation');
      setIsProcessing(false);
    }, 3000);
  };

  const handleConfirm = () => {
    const reference = `MPESA${Math.random().toString().slice(2, 10)}`;
    onSuccess(reference);
  };

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle>M-Pesa Payment</DialogTitle>
      <DialogContent>
        {step === 'input' && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Amount to pay: {formatCurrency(amount)}
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="254700000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        )}

        {step === 'processing' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography>
              Please check your phone for the M-Pesa prompt...
            </Typography>
          </Box>
        )}

        {step === 'confirmation' && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Did you complete the payment on your phone?
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {step === 'input' && (
          <>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!phoneNumber || isProcessing}
            >
              Pay Now
            </Button>
          </>
        )}

        {step === 'confirmation' && (
          <>
            <Button onClick={onCancel}>No, Cancel</Button>
            <Button variant="contained" onClick={handleConfirm}>
              Yes, Completed
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
} 