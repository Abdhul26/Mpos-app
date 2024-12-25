import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { query, field } = req.query

    if (!query || !field) {
      return res
        .status(400)
        .json({ message: 'Missing query or field parameter' })
    }

    let searchQuery: any = {
      take: 10,
    }

    // Handle special cases for merchant-related searches
    if (field === 'merchant_name') {
      searchQuery = {
        where: {
          merchant: {
            name: {
              contains: query as string,
              mode: 'insensitive',
            },
          },
        },
        include: {
          merchant: true,
        },
        take: 10,
      }
    } else {
      // Handle regular field searches
      searchQuery = {
        where: {
          [field as string]: {
            contains: query as string,
            mode: 'insensitive',
          },
        },
        take: 10,
      }
    }

    const results = await prisma.device.findMany(searchQuery)

    // Extract suggestions based on the search field
    let suggestions: string[]
    if (field === 'merchant_name') {
      suggestions = [
        ...new Set(
          results.map((device) => device.merchant?.name).filter(Boolean)
        ),
      ]
    } else {
      suggestions = [
        ...new Set(
          results
            .map((device) => device[field as keyof typeof device])
            .filter((item) => item !== null && item !== undefined)
            .map((item) => String(item))
        ),
      ]
    }

    return res.status(200).json({ suggestions })
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
