import * as fetch from '@/lib/fetch';

// Function to create mock URLs dynamically
const createMockUrls = () => {
  const mockUrls: Record<string, string> = {};

  for (const [key, value] of Object.entries(fetch)) {
    if (key.startsWith('API_') && typeof value === 'string') {
      const mockKey = `MOCK_${key.slice(4)}`; // Remove 'API_' prefix
      mockUrls[mockKey] = value.replace(fetch.API_URL, '/api/'); // Remove the URL variable
    }
  }

  return mockUrls;
};

// Export the mock URLs
const mockUrls = createMockUrls();

export const {
  MOCK_AUTH_LOGIN_URL,
  MOCK_AUTH_REGISTER_URL,
  MOCK_USER_URL,
  MOCK_ACTIVITY_URL,
  MOCK_VISIT_HISTORY_URL,
  MOCK_STAMPS_URL,
  MOCK_COLLECTED_STAMPS_URL,
  MOCK_BUCKET_LIST_URL,
  MOCK_COMPLETED_BUCKET_LIST_ITEMS_URL,
  MOCK_PARKS_URL,
  MOCK_PARKGEO_URL,
} = mockUrls;
