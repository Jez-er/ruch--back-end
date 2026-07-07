import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Home route - HTML
app.get('/', (req: express.Request, res: express.Response) => {
	res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `)
})

app.get('/about', function (req: express.Request, res: express.Response) {
	res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

// Example API endpoint - JSON
app.get('/api-data', (req: express.Request, res: express.Response) => {
	res.json({
		message: 'Here is some sample API data',
		items: ['apple', 'banana', 'cherry'],
	})
})

// Health check
app.get('/healthz', (req: express.Request, res: express.Response) => {
	res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/somedata', (req: express.Request, res: express.Response) => {
	res.json({
		message: 'This is some data from the /somedata endpoint',
		data: [1, 2, 3, 4, 5],
	})
})

export default app
