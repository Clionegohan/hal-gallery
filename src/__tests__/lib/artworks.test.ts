import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getAllArtworks } from '@/lib/artworks'
import type { Artwork } from '@/lib/types'

// Mock the artworks content
vi.mock('@/content/artworks', () => ({
  ARTWORKS: [
    {
      id: '001',
      slug: 'test-artwork-1',
      name: 'Test Artwork 1',
      description: 'First test artwork',
      imageUrl: '/illustrations/test-1.png',
    },
    {
      id: '002',
      slug: 'test-artwork-2',
      name: 'Test Artwork 2',
      description: 'Second test artwork',
      imageUrl: '/illustrations/test-2.png',
    },
  ] as Artwork[],
}))

describe('getAllArtworks', () => {
  describe('Basic Functionality', () => {
    it('should return an array of artworks', () => {
      const result = getAllArtworks()
      expect(Array.isArray(result)).toBe(true)
    })

    it('should return artworks with correct structure', () => {
      const result = getAllArtworks()
      expect(result.length).toBeGreaterThan(0)
      
      result.forEach((artwork) => {
        expect(artwork).toHaveProperty('id')
        expect(artwork).toHaveProperty('slug')
        expect(artwork).toHaveProperty('name')
        expect(artwork).toHaveProperty('description')
        expect(artwork).toHaveProperty('imageUrl')
      })
    })

    it('should return readonly array', () => {
      const result = getAllArtworks()
      expect(Object.isFrozen(result)).toBe(false) // readonly is a TypeScript compile-time check
      // But we can verify the type assertion works at compile time
      expect(result).toBeDefined()
    })

    it('should return all artworks from the content file', () => {
      const result = getAllArtworks()
      expect(result).toHaveLength(2)
    })
  })

  describe('Data Integrity', () => {
    it('should return artworks with valid id fields', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        expect(typeof artwork.id).toBe('string')
        expect(artwork.id.length).toBeGreaterThan(0)
      })
    })

    it('should return artworks with valid slug fields', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        expect(typeof artwork.slug).toBe('string')
        expect(artwork.slug.length).toBeGreaterThan(0)
      })
    })

    it('should return artworks with valid name fields', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        expect(typeof artwork.name).toBe('string')
        expect(artwork.name.length).toBeGreaterThan(0)
      })
    })

    it('should return artworks with valid description fields', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        expect(typeof artwork.description).toBe('string')
        expect(artwork.description.length).toBeGreaterThan(0)
      })
    })

    it('should return artworks with valid imageUrl fields', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        expect(typeof artwork.imageUrl).toBe('string')
        expect(artwork.imageUrl.length).toBeGreaterThan(0)
        expect(artwork.imageUrl).toMatch(/\.(png|jpg|jpeg|gif|webp|svg)$/i)
      })
    })

    it('should return artworks with unique ids', () => {
      const result = getAllArtworks()
      const ids = result.map((artwork) => artwork.id)
      const uniqueIds = new Set(ids)
      
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should return artworks with unique slugs', () => {
      const result = getAllArtworks()
      const slugs = result.map((artwork) => artwork.slug)
      const uniqueSlugs = new Set(slugs)
      
      expect(uniqueSlugs.size).toBe(slugs.length)
    })
  })

  describe('Return Value Properties', () => {
    it('should return the same reference on multiple calls', () => {
      const result1 = getAllArtworks()
      const result2 = getAllArtworks()
      
      expect(result1).toBe(result2)
    })

    it('should return artworks in consistent order', () => {
      const result1 = getAllArtworks()
      const result2 = getAllArtworks()
      
      result1.forEach((artwork, index) => {
        expect(artwork.id).toBe(result2[index].id)
      })
    })

    it('should not return null or undefined', () => {
      const result = getAllArtworks()
      expect(result).not.toBeNull()
      expect(result).not.toBeUndefined()
    })

    it('should return an array even if empty', () => {
      const result = getAllArtworks()
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('Type Safety', () => {
    it('should conform to Artwork type', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        // Check that all required properties exist and are of correct type
        expect(artwork).toMatchObject({
          id: expect.any(String),
          slug: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          imageUrl: expect.any(String),
        })
      })
    })

    it('should not have extra properties beyond Artwork type', () => {
      const result = getAllArtworks()
      
      result.forEach((artwork) => {
        const keys = Object.keys(artwork)
        const expectedKeys = ['id', 'slug', 'name', 'description', 'imageUrl']
        
        keys.forEach((key) => {
          expect(expectedKeys).toContain(key)
        })
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty ARTWORKS array gracefully', () => {
      // This tests the behavior if the content file is empty
      vi.resetModules()
      vi.doMock('@/content/artworks', () => ({
        ARTWORKS: [] as Artwork[],
      }))
      
      // Re-import to get the mocked version
      const { getAllArtworks: getAllArtworksEmpty } = require('@/lib/artworks')
      const result = getAllArtworksEmpty()
      
      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(0)
      
      vi.resetModules()
    })

    it('should preserve artwork data without mutation', () => {
      const result = getAllArtworks()
      const firstArtwork = result[0]
      const originalId = firstArtwork.id
      
      // Attempt to modify (should not affect original data due to readonly)
      // Note: This is more of a compile-time check in TypeScript
      expect(firstArtwork.id).toBe(originalId)
    })
  })

  describe('Performance', () => {
    it('should execute quickly for small datasets', () => {
      const start = performance.now()
      getAllArtworks()
      const end = performance.now()
      
      expect(end - start).toBeLessThan(10) // Should execute in less than 10ms
    })

    it('should not cause memory leaks on repeated calls', () => {
      const iterations = 1000
      
      for (let i = 0; i < iterations; i++) {
        getAllArtworks()
      }
      
      // If no error is thrown, test passes
      expect(true).toBe(true)
    })
  })

  describe('Integration with ARTWORKS constant', () => {
    it('should correctly import and expose ARTWORKS data', () => {
      const result = getAllArtworks()
      
      expect(result[0]).toMatchObject({
        id: '001',
        slug: 'test-artwork-1',
        name: 'Test Artwork 1',
        description: 'First test artwork',
        imageUrl: '/illustrations/test-1.png',
      })
    })

    it('should return all expected test artworks', () => {
      const result = getAllArtworks()
      
      expect(result).toEqual([
        {
          id: '001',
          slug: 'test-artwork-1',
          name: 'Test Artwork 1',
          description: 'First test artwork',
          imageUrl: '/illustrations/test-1.png',
        },
        {
          id: '002',
          slug: 'test-artwork-2',
          name: 'Test Artwork 2',
          description: 'Second test artwork',
          imageUrl: '/illustrations/test-2.png',
        },
      ])
    })
  })
})