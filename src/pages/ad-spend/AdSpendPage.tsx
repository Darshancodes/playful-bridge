
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AdSpendTable } from "@/components/ad-spend/AdSpendTable";
import { AdSpendResponse } from "@/types/adSpend";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeIn from "@/components/animation/FadeIn";

// Mock data based on the provided API response
const mockApiResponse: AdSpendResponse = {
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "67f8932d6b0dde2fbedf27b0",
      "postingId": "120223649391270531",
      "date": "2025-04-08T00:00:00.000Z",
      "businessId": "67f6d3a3310fb785126020c3",
      "businessCampaignId": "120223649391200531",
      "metaAdAccountId": "337724845982980",
      "metaAdId": "120223649391270531",
      "campaignId": "120223649391200531",
      "adSetId": "120223649391190531",
      "adCreativeId": "1271391788200189",
      "spend": 4.96,
      "clicks": 1,
      "conversions": 1,
      "revenue": 0,
      "instagram_permalink": "https://www.instagram.com/p/DIKh7LDs87o/",
      "createdAt": "2025-04-11T03:57:33.083Z",
      "updatedAt": "2025-04-11T03:57:33.083Z",
      "__v": 0
    },
    {
      "_id": "67f89505d6168264585c3620",
      "postingId": "120223649391270531",
      "date": "2025-04-09T00:00:00.000Z",
      "businessId": "67f6d3a3310fb785126020c3",
      "businessCampaignId": "120223649391200531",
      "metaAdAccountId": "337724845982980",
      "metaAdId": "120223649391270531",
      "campaignId": "120223649391200531",
      "adSetId": "120223649391190531",
      "adCreativeId": "1271391788200189",
      "spend": 8.2,
      "clicks": 3,
      "conversions": 1,
      "revenue": 45,
      "instagram_permalink": "https://www.instagram.com/p/DIKh7LDs87o/",
      "createdAt": "2025-04-11T04:05:25.155Z",
      "updatedAt": "2025-04-11T04:05:25.155Z",
      "__v": 0
    },
    {
      "_id": "67f89505d6168264585c3622",
      "postingId": "120223649391270531",
      "date": "2025-04-10T00:00:00.000Z",
      "businessId": "67f6d3a3310fb785126020c3",
      "businessCampaignId": "120223649391200531",
      "metaAdAccountId": "337724845982980",
      "metaAdId": "120223649391270531",
      "campaignId": "120223649391200531",
      "adSetId": "120223649391190531",
      "adCreativeId": "1271391788200189",
      "spend": 6.5,
      "clicks": 2,
      "conversions": 1,
      "revenue": 0,
      "instagram_permalink": "https://www.instagram.com/p/DIKh7LDs87o/",
      "createdAt": "2025-04-11T04:05:25.401Z",
      "updatedAt": "2025-04-11T04:05:25.401Z",
      "__v": 0
    },
    {
      "_id": "67f89505d6168264585c3624",
      "postingId": "120223649391270531",
      "date": "2025-04-11T00:00:00.000Z",
      "businessId": "67f6d3a3310fb785126020c3",
      "businessCampaignId": "120223649391200531",
      "metaAdAccountId": "337724845982980",
      "metaAdId": "120223649391270531",
      "campaignId": "120223649391200531",
      "adSetId": "120223649391190531",
      "adCreativeId": "1271391788200189",
      "spend": 11.3,
      "clicks": 4,
      "conversions": 0,
      "revenue": 92,
      "instagram_permalink": "https://www.instagram.com/p/DIKh7LDs87o/",
      "createdAt": "2025-04-11T04:05:25.473Z",
      "updatedAt": "2025-04-11T04:05:25.473Z",
      "__v": 0
    }
  ]
};

export function AdSpendPage() {
  const [adSpendData, setAdSpendData] = useState<AdSpendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      setAdSpendData(mockApiResponse);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <FadeIn>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Ad Spend Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Track your Instagram ad campaign performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Refresh Data</Button>
            </div>
          </div>

          <Tabs defaultValue="day" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="day">Daily</TabsTrigger>
              <TabsTrigger value="week">Weekly</TabsTrigger>
              <TabsTrigger value="month">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="day" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-60">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : adSpendData ? (
                <AdSpendTable data={adSpendData.data} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No data available</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="week" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Weekly data view coming soon</p>
              </div>
            </TabsContent>
            <TabsContent value="month" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Monthly data view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </DashboardLayout>
  );
}
