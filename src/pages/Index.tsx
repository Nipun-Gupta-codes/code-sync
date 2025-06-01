
import React from 'react';
import { Box, Grid, Card, CardContent, CardActionArea, Typography, Container } from '@mui/material';
import { Code, Groups, PersonAdd } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            CodeSync
          </Typography>
          <Typography variant="h6">
            Collaborative Code Editor - Write, Share, and Execute Code Together
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Solo IDE Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardActionArea 
                onClick={() => handleNavigation('/solo')}
                sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Code sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Solo IDE
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start coding immediately with our online IDE. Supports C++, Java, Python, and JavaScript.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Create Room Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardActionArea 
                onClick={() => handleNavigation('/create')}
                sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <PersonAdd sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Create Room
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create a collaborative coding room and invite others to code together in real-time.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Join Room Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardActionArea 
                onClick={() => handleNavigation('/join')}
                sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Groups sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Join Room
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join an existing coding room using an invite link and collaborate with others.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>Real-time Collaboration</Typography>
                <Typography variant="body2" color="text.secondary">
                  Code together with live cursors and instant synchronization
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>Multiple Languages</Typography>
                <Typography variant="body2" color="text.secondary">
                  Support for C++, Java, Python, and JavaScript with syntax highlighting
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>Code Execution</Typography>
                <Typography variant="body2" color="text.secondary">
                  Run your code directly in the browser and see results instantly
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
