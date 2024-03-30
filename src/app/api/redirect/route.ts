import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hello: 'world11'
  })
}
