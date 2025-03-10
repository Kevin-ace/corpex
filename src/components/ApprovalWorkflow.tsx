import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

interface ApprovalStep {
  role: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  comment?: string;
}

interface ApprovalWorkflowProps {
  steps: ApprovalStep[];
  currentStep: number;
  onApprove?: () => void;
  onReject?: () => void;
}

export function ApprovalWorkflow({
  steps,
  currentStep,
  onApprove,
  onReject,
}: ApprovalWorkflowProps) {
  return (
    <Box>
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              optional={
                step.status !== 'pending' && (
                  <Typography variant="caption">
                    {step.date}
                  </Typography>
                )
              }
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{step.role}</Typography>
                <Chip
                  size="small"
                  label={step.status.toUpperCase()}
                  color={
                    step.status === 'approved'
                      ? 'success'
                      : step.status === 'rejected'
                      ? 'error'
                      : 'default'
                  }
                />
              </Box>
              {step.status !== 'pending' && (
                <Typography variant="body2" color="text.secondary">
                  {step.name}
                </Typography>
              )}
              {step.comment && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  "{step.comment}"
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {onApprove && onReject && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={onApprove}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={onReject}
          >
            Reject
          </Button>
        </Box>
      )}
    </Box>
  );
} 