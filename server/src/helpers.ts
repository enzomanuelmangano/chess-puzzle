import { randomBytes, createHash } from 'crypto';
////// Custom API Key Generation & Hashing ///////

// Recursive function to generate a unique random string as API key
export const generateAPIKey = () => {
  const apiKey = randomBytes(16).toString('hex');
  const hashedAPIKey = hashAPIKey(apiKey);

  // Ensure API key is unique
  //   if (apiKeys[hashedAPIKey]) {
  //     generateAPIKey();
  //   } else {
  return { hashedAPIKey, apiKey };
  //   }
};

// Hash the API key
export const hashAPIKey = (apiKey: string) => {
  const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');

  return hashedAPIKey;
};
