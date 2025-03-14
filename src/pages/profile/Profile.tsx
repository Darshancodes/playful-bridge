
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useMetaAds } from '@/context/MetaAdsContext';
import FadeIn from '@/components/animation/FadeIn';
import { Facebook } from 'lucide-react';

// Define validation schema based on user role
const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  website: z.string().url('Please enter a valid URL'),
  bio: z.string().optional(),
});

const creatorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  specialty: z.string().min(2, 'Specialty is required'),
  portfolioLink: z.string().url('Please enter a valid URL'),
  bio: z.string().optional(),
});

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { connected, connecting, connectToMetaAds, disconnectMetaAds } = useMetaAds();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  // Determine which schema to use based on user role
  const schema = user.role === 'brand' ? brandSchema : creatorSchema;
  
  // Set up form with default values from user profile
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: user.role === 'brand' 
      ? {
          companyName: user.companyName || '',
          industry: user.industry || '',
          website: user.website || '',
          bio: user.bio || '',
        }
      : {
          name: user.name || '',
          specialty: user.specialty || '',
          portfolioLink: user.portfolioLink || '',
          bio: user.bio || '',
        },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would make an API call
      // For the MVP, we'll just update the local state
      updateProfile(data);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMetaConnect = async () => {
    try {
      await connectToMetaAds();
      toast({
        title: "Connected to Meta Ads",
        description: "Your Meta Ads account has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "There was a problem connecting to Meta Ads.",
        variant: "destructive",
      });
    }
  };

  const handleMetaDisconnect = async () => {
    try {
      await disconnectMetaAds();
      toast({
        title: "Disconnected from Meta Ads",
        description: "Your Meta Ads account has been disconnected.",
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: "There was a problem disconnecting from Meta Ads.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-1">Profile Settings</h1>
          <p className="text-gray-600 mb-8">Manage your account information</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {user.role === 'brand' ? (
                    // Brand-specific fields
                    <>
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input placeholder="Your industry" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : (
                    // Creator-specific fields
                    <>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialty</FormLabel>
                            <FormControl>
                              <Input placeholder="Your creative specialty" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="portfolioLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio Link</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourportfolio.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {/* Common fields for both user types */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a bit about yourself or your company" 
                            className="resize-none" 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {user.role === 'brand' && (
            <Card>
              <CardHeader>
                <CardTitle>Meta Ads Integration</CardTitle>
                <CardDescription>
                  Connect your Meta Ads account to track ad performance and spend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Facebook className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Meta Ads Account</h3>
                      <p className="text-sm text-gray-500">
                        {connected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>

                  {connected ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Your Meta Ads account is connected. You can now track performance and spend for your creatives.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleMetaDisconnect} 
                        disabled={connecting}
                      >
                        Disconnect Account
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Connect your Meta Ads account to track performance metrics and ad spend for your creatives.
                      </p>
                      <Button 
                        onClick={handleMetaConnect} 
                        disabled={connecting}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {connecting ? "Connecting..." : "Connect Meta Ads"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
