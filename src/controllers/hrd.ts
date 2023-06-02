// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-unsupported-features/es-syntax */
import { Request, Response } from 'express';
const axios = require('axios');

/**
 *
 * Handle GET request to get examples
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 */

// const HRD_URL = process.env.HRD_URL || "https://devapi.betagro.com/hrd/v1/dc/organizationgroups/email/Tependral";
// const HRD_XAPI = process.env.HRD_XAPI || "5UMJVQI+Impe-ADqE+uw*_Bq$tQVxxpejemC@cTDpmxMchXlFL@ldwvg!F^a-8JuXigDJV5$EHQcR%W$sr8g05CKXT7^MRU@x^ukJvRol9Jyg1OzC-9Md+DAEUK$wj";
// const HRD_API = process.env.HRD_API || "613869ab05893e367e1a7f0b40144b666e2842b7b7077db4e34b2537";

/**
 *
 * @param _req
 * @param res
 */
export async function retrieve(_req: Request, res: Response) {
  try {
    const response = await axios.get(process.env.HRD_URL, {
      headers: {
        XApiKey: process.env.HRD_XAPI,
        APIKey: process.env.HRD_API,
      },
    });
    const responseData = response.data;
    // Process the response data and send it back as a response
    res.json(responseData);
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error calling the other API:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
