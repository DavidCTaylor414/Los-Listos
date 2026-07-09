import { MongoClient } from 'mongodb'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '../.env.local')
try {
  const env = readFileSync(envPath, 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch {}

const [,, email, password] = process.argv
if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password>')
  process.exit(1)
}

// Use dynamic import for bcryptjs
const bcrypt = await import('bcryptjs')
const hashed = await bcrypt.default.hash(password, 12)

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
const db = client.db('los-listos')
await db.collection('admins').updateOne(
  { email: email.toLowerCase() },
  { $set: { email: email.toLowerCase(), password: hashed, name: email.split('@')[0] } },
  { upsert: true }
)
console.log(`✅ Admin user created: ${email}`)
await client.close()
