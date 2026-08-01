const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let decodedPath = decodeURIComponent(req.url);
    let filePath = '.' + decodedPath;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
        case '.m4a':
            contentType = 'audio/mp4';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    fs.stat(filePath, (err, stat) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found: ' + filePath);
            return;
        }

        const fileSize = stat.size;

        if (req.headers.range) {
            const parts = req.headers.range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

const PORT = 8100;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});