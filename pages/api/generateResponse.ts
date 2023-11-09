import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
require('dotenv').config({ path: __dirname + '/.env' }); // Load environment variables from .env file

// Initialize CORS middleware
const corsMiddleware = cors();

// Fetch the Hugging Face API key from environment variables
const apiKey = process.env.HUGGING_FACE_API_KEY;

// Function to query the Hugging Face model
async function query(data: any) {
  console.log(data);

  // Make a request to the Hugging Face API
  const response = await fetch(
    "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use the API key from environment variables
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

// Export the API handler function
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, () => {}); // Enable CORS

  try {
    const command = req.body.command;

    // Call the query function to interact with the Hugging Face model
    const response = await query({
      "inputs": command,
      parameters: {
        "max_new_tokens": 85,
        "stream": true,
      },
    });

    // Set CORS headers and return the response
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
