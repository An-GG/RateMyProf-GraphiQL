const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

// Add the static file serving middleware for the GraphiQL HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/graphql',
  createProxyMiddleware({
    target: 'https://www.ratemyprofessors.com',
    changeOrigin: true,
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Authorization', `Basic dGVzdDp0ZXN0`);
    },
  }),
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

