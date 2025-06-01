
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Join Room</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Join a Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomLink">Room Link</Label>
                <Input
                  id="roomLink"
                  value={roomLink}
                  onChange={(e) => setRoomLink(e.target.value)}
                  placeholder="Paste the invite link (https://codesync.app/join/ROOM_ID)"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password (if required)</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter room password"
                />
              </div>
              
              <Button
                onClick={handleJoin}
                disabled={!roomLink.trim() || loading}
                className="w-full"
              >
                {loading ? 'Joining...' : 'Join Room'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
