import React, { useEffect, useState } from 'react';
import { analyticsService } from '../api-service';

function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await analyticsService.getAllAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-page">
      <h2>Analytics Dashboard</h2>
      {analyticsData ? (
        <div>
          {/* Display analytics data here */}
          <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading analytics data...</p>
      )}
    </div>
  );
}

export default AnalyticsPage;
