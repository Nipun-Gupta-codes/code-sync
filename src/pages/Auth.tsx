
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  
  // Sign In form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up form state
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignIn = async () => {
    if (!signInEmail.trim() || !signInPassword.trim()) {
      alert('Email and password are required');
      return;
    }

    setLoading(true);
    
    // Simulate sign in - replace with real authentication
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', signInEmail);
      
      // Redirect to intended page or dashboard
      const from = location.state?.from || '/';
      navigate(from);
    }, 1000);
  };

  const handleSignUp = async () => {
    if (!signUpUsername.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    
    // Simulate sign up - replace with real authentication
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', signUpEmail);
      localStorage.setItem('username', signUpUsername);
      
      // Redirect to intended page or dashboard
      const from = location.state?.from || '/';
      navigate(from);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign in
    alert('Google sign-in would be implemented here');
  };

  const handleGitHubSignIn = () => {
    // Simulate GitHub sign in
    alert('GitHub sign-in would be implemented here');
  };

  const handleSkipSignIn = () => {
    // Allow access to solo editor without authentication
    navigate('/solo');
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
          <h1 className="text-xl font-semibold">Authentication</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Welcome to CodeSync</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <Button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <div className="space-y-2">
                    <Button
                      onClick={handleGoogleSignIn}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In with Google
                    </Button>
                    
                    <Button
                      onClick={handleGitHubSignIn}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In with GitHub
                    </Button>
                  </div>

                  <Button
                    onClick={handleSkipSignIn}
                    variant="ghost"
                    className="w-full"
                  >
                    Skip Sign In (Solo Mode Only)
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      value={signUpUsername}
                      onChange={(e) => setSignUpUsername(e.target.value)}
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <Button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>

                  <div className="space-y-2">
                    <Button
                      onClick={handleGoogleSignIn}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Up with Google
                    </Button>
                    
                    <Button
                      onClick={handleGitHubSignIn}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Up with GitHub
                    </Button>
                  </div>

                  <Button
                    onClick={handleSkipSignIn}
                    variant="ghost"
                    className="w-full"
                  >
                    Skip Sign Up (Solo Mode Only)
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
