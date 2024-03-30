export interface User {
  id: number
  email: string
  first_name: string
  last_name?: string
  provider: string
  updated_at: string
}

export interface Link {
  id: number
  userId: number
  originalUrl: string
  shortCode: string
  createdAt: string
  expiresAt: string
  isActive: string
}

export interface Click {
  id: number
  linkId: string
  clickedAt: string
  referrer: string
  ipAddress: string
  userAgent: string
}
