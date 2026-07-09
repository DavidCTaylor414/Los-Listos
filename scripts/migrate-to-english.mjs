import { MongoClient } from 'mongodb'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envFile = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
const envVars = Object.fromEntries(envFile.split('\n').filter(l => l.includes('=')).map(l => l.split('=').map((v, i) => i === 0 ? v.trim() : l.slice(l.indexOf('=') + 1).trim())))

const uri = envVars.MONGODB_URI
if (!uri) { console.error('MONGODB_URI not set'); process.exit(1) }

const client = new MongoClient(uri)

async function migrate() {
  await client.connect()
  const db = client.db()
  const col = db.collection('properties')

  // Migrate type values
  const typeMap = { 'Casa': 'House', 'Condominio': 'Condo', 'Multi-Familiar': 'Multi-Family' }
  for (const [from, to] of Object.entries(typeMap)) {
    const r = await col.updateMany({ type: from }, { $set: { type: to } })
    console.log(`type ${from} → ${to}: ${r.modifiedCount} updated`)
  }

  // Migrate status values
  const statusMap = { 'En Venta': 'For Sale', 'Bajo Contrato': 'Under Contract', 'Vendido': 'Sold' }
  for (const [from, to] of Object.entries(statusMap)) {
    const r = await col.updateMany({ status: from }, { $set: { status: to } })
    console.log(`status ${from} → ${to}: ${r.modifiedCount} updated`)
  }

  // Migrate features arrays by property ID
  const featuresMap = {
    '1':  ['2-Car Garage', 'Updated Kitchen', 'Large Backyard', 'Hardwood Floors', 'Central A/C', 'Laundry Room'],
    '2':  ['Private Balcony', 'City View', 'Modern Appliances', 'Building Gym', '24-hr Security', 'Parking Included'],
    '3':  ['Gated Community', 'Pool', 'Private Patio', 'Attached Garage', 'Playground', 'Guest Room'],
    '4':  ['Corner Lot', 'New Roof 2024', 'Renovated Bathrooms', 'Additional Room', 'Large Yard', 'Multigenerational Layout'],
    '5':  ['2 Rented Units', '$2,800/mo Income', 'Separate Utilities', 'Private Parking', 'Stable Tenants', 'High Rental Demand'],
    '6':  ['Move-In Ready', 'Near Schools', 'Family-Friendly', 'Nearby Park', 'Open Kitchen', 'Backyard'],
    '7':  ['Resort-Style Pool', "Chef's Kitchen", 'Outdoor Kitchen', 'Guest Suite', 'Wine Cellar', 'Gated Community'],
    '8':  ['Floor-to-Ceiling Windows', 'Exposed Concrete', 'Walkable Location', 'Shared Rooftop Deck', 'Bike Included', 'Pet-Friendly'],
    '9':  ['Fully Renovated', 'New Kitchen', 'New Roof', 'New Plumbing', 'Original Hardwood Floors', 'Charming Patio'],
    '10': ['Greenbelt Adjacent', '3-Car Garage', 'Large Deck', 'Mature Trees', 'Gourmet Kitchen', 'Storage Room'],
    '11': ['New Construction', 'Smart Home', "Builder's Warranty", 'Energy-Efficient', 'Community Pool', 'Playground'],
    '12': ['Waterfront', 'Rooftop Terrace', 'Downtown View', 'Private Elevator', '2-Car Garage', 'Luxury Finishes'],
    '13': ['Gated Community', 'Pool', 'Fitness Center', 'Covered Parking', 'Near SMU', 'Great for First-Time Buyers'],
    '14': ['2.5 Acres', 'Home Theater', 'Game Room', 'Resort Pool', '4-Car Garage', 'Detached Casita'],
    '15': ['Terrazzo Floors', 'Vaulted Ceilings', 'Fully Renovated', 'Lush Landscaping', 'Original Windows', 'Near Med Center'],
    '16': ['4 Occupied Units', '$6,400/mo Income', 'East Austin Location', 'Separate Utilities', 'Parking Per Unit', 'High Demand'],
    '17': ['Golf Course View', 'Open Concept', "Butler's Pantry", 'Media Room', 'Covered Outdoor Area', 'Private Community'],
    '18': ['Built in 1928', 'Wraparound Porch', 'Original Hardwoods', 'Clawfoot Tub', 'Historic Neighborhood', 'Fully Walkable'],
    '19': ['28th Floor', 'Panoramic Views', 'Concierge', 'Valet Parking', 'Rooftop Pool', 'Building Spa'],
    '20': ['Like-New', 'Private Rooftop Deck', 'Quartz Counters', 'Hardwood Floors', 'Near Galleria', '3 Stories'],
    '21': ['Great Potential', 'Large Lot', 'Detached Garage', 'Hidden Hardwood Floors', 'Affordable Entry Price', 'Alley Access'],
    '22': ['Plano ISD', 'Grand Entry', 'Game Room', '3-Car Garage', 'Pergola & Fire Pit', 'Formal Dining'],
    '23': ['Built in 2022', 'Shiplap Accent Walls', 'Farmhouse Sink', 'Open Floor Plan', 'Covered Porch', 'Greenbelt View'],
    '24': ['Exposed Brick', 'Steel Beams', 'Polished Concrete', 'Walk to River Walk', 'High Ceilings', 'Industrial Windows'],
    '25': ['Solar Panels', 'Mountain Views', 'Nearly New', 'Covered Patio', 'Energy-Efficient', 'No HOA'],
    '26': ['Corner Unit', 'Private Rooftop', '2-Car Garage', 'Historic District', 'Walkable', 'Built in 2021'],
  }

  for (const [id, features] of Object.entries(featuresMap)) {
    const r = await col.updateOne({ id }, { $set: { features } })
    console.log(`features for property ${id}: ${r.modifiedCount} updated`)
  }

  console.log('\nMigration complete.')
  await client.close()
}

migrate().catch((err) => { console.error(err); process.exit(1) })
