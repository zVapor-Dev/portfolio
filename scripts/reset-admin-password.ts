import config from '@payload-config'
import { getPayload } from 'payload'

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  console.error('DATABASE_URL is required.')
  process.exit(1)
}

if (!process.env.PAYLOAD_SECRET) {
  console.error('PAYLOAD_SECRET is required. Any long random string is enough for this command.')
  process.exit(1)
}

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required.')
  process.exit(1)
}

const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

const user = docs[0]
if (!user) {
  console.error('No user with that email')
  process.exit(1)
}

await payload.update({
  collection: 'users',
  id: user.id,
  data: { password },
})

console.log('Password updated for', email)
process.exit(0)
