
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Users, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">CodeSync</h1>
          <p className="text-xl opacity-90">
            Collaborative Code Editor - Write, Share, and Execute Code Together
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
          {/* Solo IDE Card */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Solo IDE</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Start coding immediately with our online IDE. Supports C++, Java, Python, and JavaScript.
              </p>
              <Button 
                onClick={() => navigate('/solo')}
                className="w-full"
              >
                Start Coding
              </Button>
            </CardContent>
          </Card>

          {/* Create Room Card */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <UserPlus className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Create Room</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Create a collaborative coding room and invite others to code together in real-time.
              </p>
              <Button 
                onClick={() => navigate('/create')}
                className="w-full"
                variant="outline"
              >
                Create Room
              </Button>
            </CardContent>
          </Card>

          {/* Join Room Card */}
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Join Room</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Join an existing coding room using an invite link and collaborate with others.
              </p>
              <Button 
                onClick={() => navigate('/join')}
                className="w-full"
                variant="secondary"
              >
                Join Room
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-4xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600">
                Code together with live cursors and instant synchronization
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
              <p className="text-gray-600">
                Support for C++, Java, Python, and JavaScript with syntax highlighting
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Code Execution</h3>
              <p className="text-gray-600">
                Run your code directly in the browser and see results instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
