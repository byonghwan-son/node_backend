const http = require('http');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const url = require('url')

http.createServer((req, res) => {
  try {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'text/html; charset=utf-8;')
    if(path in urlMap) {
      urlMap[path](req, res);
    }
    else {
      throw new hasUncaughtExceptionCaptureCallback();
    }
  }
  catch(ex) {
    console.log(ex);
    notFound(req, res);
  }
})
.listen('3000', () => console.log('라우터를 만들어 보자!!'))


const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(`[user] 사용자: ${userInfo.user}, 나이 : ${userInfo.age}`);
}

const feed = (req, res) => {
  res.end(`
    <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
    </ul>
  `);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end('404 file not found');
}

const urlMap = {
  '/': (req, res) => res.end('Home'),
  '/user': user,
  '/feed': feed
}