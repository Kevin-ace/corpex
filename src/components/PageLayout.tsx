import { Box, Typography, Paper } from '@mui/material';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      <Paper sx={{ p: 3, borderRadius: 2 }}>{children}</Paper>
    </Box>
  );
} 