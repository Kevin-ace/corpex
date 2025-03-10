import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { api } from '../services/api';

interface ReportGeneratorProps {
  onGenerate: (url: string) => void;
}

export function ReportGenerator({ onGenerate }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState('expense');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!startDate || !endDate) return;

    setIsGenerating(true);
    try {
      const { url } = await api.generateReport({
        type: reportType,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      onGenerate(url);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Generate Report
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Report Type</InputLabel>
        <Select
          value={reportType}
          label="Report Type"
          onChange={(e) => setReportType(e.target.value)}
        >
          <MenuItem value="expense">Expense Report</MenuItem>
          <MenuItem value="summary">Summary Report</MenuItem>
          <MenuItem value="audit">Audit Report</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={handleGenerate}
        disabled={isGenerating || !startDate || !endDate}
      >
        {isGenerating ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Generating...
          </>
        ) : (
          'Generate Report'
        )}
      </Button>
    </Box>
  );
} 