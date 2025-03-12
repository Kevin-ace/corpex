import { Box, Typography, Breadcrumbs } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <RouterLink 
            to="/"
            style={{ 
              color: 'inherit', 
              textDecoration: 'none'
            }}
          >
            Home
          </RouterLink>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <Typography key={name} color="text.primary">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            ) : (
              <RouterLink
                key={name}
                to={routeTo}
                style={{ 
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </RouterLink>
            );
          })}
        </Breadcrumbs>
      </Box>
      {children}
    </Box>
  );
} 