import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { PageLayout } from '../components/PageLayout';

export function ExpensesPage() {
  const [filter, setFilter] = useState('all');

  return (
    <PageLayout title="Expenses">
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search expenses..."
          size="small"
          sx={{ width: 300 }}
        />
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample data - will be replaced with real data */}
            <TableRow>
              <TableCell>2024-03-20</TableCell>
              <TableCell>Starbucks</TableCell>
              <TableCell>Meals & Entertainment</TableCell>
              <TableCell>$28.50</TableCell>
              <TableCell>
                <Chip label="Pending" color="warning" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
} 