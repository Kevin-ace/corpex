import { Box, Typography, Breadcrumbs, useMediaQuery, useTheme, Container } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          mb: { xs: 2, sm: 3 },
          px: { xs: 0, sm: 1 }
        }}
      >
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            fontWeight: 500
          }}
        >
          {title}
        </Typography>
        <Breadcrumbs 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'wrap'
            }
          }}
        >
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
              <Typography key={name} color="text.primary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
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
      <Box sx={{ width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
} 