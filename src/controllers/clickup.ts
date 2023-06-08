// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-unsupported-features/es-syntax */
import { Request, Response } from 'express';
import { restructure } from './clickup-functions';
const axios = require('axios');

/**
 *
 * Handle GET request to get examples
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 */

/**
 *
 * @param _req
 * @param res
 */
export async function retrieve(_req: Request, res: Response) {
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/list/216786912/task?page=0`,
      {
        headers: {
          Authorization: process.env.CU_TOKEN,
        },
        params: {
          include_closed: true,
        },
      }
    );
    const responseData = response.data;
    const restructed = await restructure(responseData);
    res.json(restructed);
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error calling the other API:', error);
    res.status(500).json({ error: 'An error occurredxxx' });
  }
}

export function test(_req: Request, res: Response) {
  res.json("OK");
}
