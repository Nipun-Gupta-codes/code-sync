
import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Paper,
  TextField,
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomLink, setRoomLink] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!roomLink.trim()) {
      alert('Room link is required');
      return;
    }

    setLoading(true);
    
    // Simulate room joining
    setTimeout(() => {
      setLoading(false);
      alert('Joined room successfully!');
      navigate('/');
    }, 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">
            Join Room
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Join a Room
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Room Link"
              value={roomLink}
              onChange={(e) => setRoomLink(e.target.value)}
              margin="normal"
              required
              helperText="Paste the invite link (https://codesync.app/join/ROOM_ID)"
            />
            
            <TextField
              fullWidth
              label="Password (if required)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            
            <Box sx={{ position: 'relative', mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleJoin}
                disabled={!roomLink.trim() || loading}
              >
                Join Room
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default JoinRoom;
