// import * as msal from '@azure/msal-node';
// import * as jwt from 'jsonwebtoken'
// import express from 'express'
// import { prisma } from '../db';
// const router = express.Router()

// const AAD_REDIRECT_URI = `${process.env.SELF_HOST}/v1/authentication/aad/redirect`

// const config: msal.Configuration = {
//     auth: {
//         clientId: `${process.env.AUTH_AZURE_APP_CLIENT_ID}`, // https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/appId/501983c2-cd4d-4fe9-bcfc-be08950926ec/isMSAApp/
//         authority: "https://login.microsoftonline.com/common",
//         clientSecret: process.env.AUTH_AZURE_APP_CLIENT_SECRET,
//         protocolMode: msal.ProtocolMode.OIDC,
//     },
//     system: {
//         loggerOptions: {
//             loggerCallback(loglevel, message, containsPii) {
//                 // console.log(message);
//             },
//             piiLoggingEnabled: false,
//             logLevel: msal.LogLevel.Verbose,
//         }
//     }
// }

// // Create msal application object
// const pca = new msal.ConfidentialClientApplication(config);

// // aad -> azure active directory
// router.get('/aad', (req, res) => {
//     const authCodeUrlParameters: msal.AuthorizationUrlRequest = {
//         scopes: ["user.read"],
//         redirectUri: AAD_REDIRECT_URI,
//         state: req.query.continue as string, // this value is passed in query param 'state' in /api/login/aad/redirect
//     }

//     // get url to sign user in and consent to scopes needed for application
//     pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
//         res.redirect(response)
//     }).catch((error) => console.error(JSON.stringify(error)));
// })

// router.get('/aad/redirect', (req, res) => {
//     const url = new URL(req.query.state as string)

//     if (!req.query.code) {
//         // res.status(500).send('AAD code not present in query params')
//         // return
//         url.searchParams.append('token', "");
//         return
//     }

//     // console.log(req.query.code);

//     const tokenRequest: msal.AuthorizationCodeRequest = {
//         code: req.query.code as string,
//         scopes: ["user.read"],
//         redirectUri: AAD_REDIRECT_URI,
//     }

//     pca.acquireTokenByCode(tokenRequest).then(async (response) => {
//         if (!response) {
//             // res.status(400).send('Failed. Empty response.')
//             // return
//             // return res.status(500).json({ status: "ERROR", message: 'Failed. Empty response.' });
//             url.searchParams.append('token', "");
//             res.redirect(url.toString());
//             return
//         }

//         // @ts-ignore
//         const username = response.idTokenClaims.unique_name
//         if (!username) {
//             // res.status(500).send('.idTokenClaims.unique_name not provided in response \n' + JSON.stringify(response.idTokenClaims))
//             // return
//             // return res.status(500).json({ status: "ERROR", message: '.idTokenClaims.unique_name not provided in response \n' + JSON.stringify(response.idTokenClaims) });
//             url.searchParams.append('token', "");
//             res.redirect(url.toString());
//             return
//         }

//         // console.log('UserName: ' + username);
//         const user = await prisma.user.findFirst({
//             where: {
//                 AND: [
//                     {
//                         username: {
//                             equals: username.replace(/@BETAGRO.COM/i, "").toLowerCase(),
//                             mode: 'insensitive'
//                         }
//                     },
//                     {
//                         active: true
//                     }
//                 ]
//             }
//         })

//         // console.log(user);
//         if (user === null) {
//             // res.status(500).send('User not authorize!!!')
//             // return
//             // return res.status(401).json({ status: "ERROR", message: 'User not authorize!!!' });
//             url.searchParams.append('token', "");
//             res.redirect(url.toString());
//             return
//         }

//         let role: { id: string, username: string, fullname: string, roleId: string, buId: string }[] = [];
//         role = await prisma.$queryRaw`SELECT a.id, a.username, a.fullname, a."roleId" , b."buId" FROM "User" AS a INNER JOIN "Role" AS b ON a."roleId"::varchar  = b."roleId"::varchar WHERE a."username" = ${username.replace(/@BETAGRO.COM/i, "").toLowerCase()};`


//         // const role = await prisma.role.findFirst({
//         //     where: {
//         //         AND: [
//         //             {
//         //                 roleId: user.roleId,
//         //             },
//         //             {
//         //                 active: true
//         //             }
//         //         ]
//         //     }
//         // })
//         // console.log(role[0].buId);
//         const { v4: uuidv4, } = require('uuid');
//         const token = jwt.sign({ id: uuidv4(), Sid: user.id, Jti: role[0].buId, Sub: user.username, Name: user.fullname, role: user.roleId }, process.env.JWT_SECRET as string, {
//             expiresIn: '1d',
//         })

//         // console.log(token);
//         // console.log(url.toString());

//         url.searchParams.append('token', token)
//         res.redirect(url.toString())

//     }).catch((error) => {
//         // console.log(error)
//         // res.status(500).send(error)
//         return res.status(500).json({ status: "ERROR", message: error });

//     });
// })


// router.get('/health', (req, res) => {
//     res.send('API OK')
// })


// export default router