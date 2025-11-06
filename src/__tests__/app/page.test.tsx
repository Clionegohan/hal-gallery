import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'
import type { Artwork } from '@/lib/types'

vi.mock('@/lib/artworks', () => ({
  getAllArtworks: vi.fn(),
}))

import { getAllArtworks } from '@/lib/artworks'

const mockArtworks: Artwork[] = [
  {
    id: '001',
    slug: 'test-artwork-1',
    name: 'Test Artwork 1',
    description: 'First test artwork description',
    imageUrl: '/illustrations/test-1.png',
  },
  {
    id: '002',
    slug: 'test-artwork-2',
    name: 'Test Artwork 2',
    description: 'Second test artwork description',
    imageUrl: '/illustrations/test-2.png',
  },
  {
    id: '003',
    slug: 'test-artwork-3',
    name: 'Test Artwork 3',
    description: 'Third test artwork description',
    imageUrl: '/illustrations/test-3.png',
  },
]

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getAllArtworks).mockReturnValue(mockArtworks)
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<HomePage />)
      expect(screen.getByText('Art')).toBeInTheDocument()
    })

    it('should render the main heading', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { level: 1, name: 'Art' })
      expect(heading).toBeInTheDocument()
    })

    it('should have correct heading styles', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { level: 1, name: 'Art' })
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-white')
    })

    it('should render the container with correct spacing', () => {
      const { container } = render(<HomePage />)
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('space-y-6')
    })

    it('should render the grid container', () => {
      const { container } = render(<HomePage />)
      const gridDiv = container.querySelector('.grid')
      expect(gridDiv).toBeInTheDocument()
    })

    it('should have correct grid classes', () => {
      const { container } = render(<HomePage />)
      const gridDiv = container.querySelector('.grid')
      expect(gridDiv).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      )
    })
  })

  describe('Artwork Display', () => {
    it('should render all artworks', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        expect(screen.getByText(artwork.name)).toBeInTheDocument()
        expect(screen.getByText(artwork.description)).toBeInTheDocument()
      })
    })

    it('should render correct number of artwork cards', () => {
      const { container } = render(<HomePage />)
      const artworkCards = container.querySelectorAll('.bg-black.rounded-lg')
      expect(artworkCards).toHaveLength(mockArtworks.length)
    })

    it('should render artwork images with correct src', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        const img = screen.getByAltText(artwork.name)
        expect(img).toHaveAttribute('src', artwork.imageUrl)
      })
    })

    it('should render artwork images with correct alt text', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        const img = screen.getByAltText(artwork.name)
        expect(img).toBeInTheDocument()
      })
    })

    it('should render artwork names as h2 headings', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        const heading = screen.getByRole('heading', { level: 2, name: artwork.name })
        expect(heading).toBeInTheDocument()
      })
    })

    it('should apply correct styles to artwork cards', () => {
      const { container } = render(<HomePage />)
      const artworkCard = container.querySelector('.bg-black.rounded-lg')
      
      expect(artworkCard).toHaveClass(
        'bg-black',
        'rounded-lg',
        'shadow-md',
        'overflow-hidden',
        'hover:shadow-lg',
        'transition-shadow'
      )
    })

    it('should apply correct styles to artwork images', () => {
      render(<HomePage />)
      const img = screen.getByAltText(mockArtworks[0].name)
      
      expect(img).toHaveClass('w-full', 'h-64', 'object-cover')
    })

    it('should apply correct styles to artwork titles', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        const heading = screen.getByRole('heading', { level: 2, name: artwork.name })
        expect(heading).toHaveClass('text-xl', 'font-semibold', 'mb-2', 'text-white')
      })
    })
  })

  describe('Data Integration', () => {
    it('should call getAllArtworks function', () => {
      render(<HomePage />)
      expect(getAllArtworks).toHaveBeenCalledTimes(1)
    })

    it('should call getAllArtworks without arguments', () => {
      render(<HomePage />)
      expect(getAllArtworks).toHaveBeenCalledWith()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty artworks array', () => {
      vi.mocked(getAllArtworks).mockReturnValue([])
      
      const { container } = render(<HomePage />)
      const heading = screen.getByText('Art')
      const artworkCards = container.querySelectorAll('.bg-black.rounded-lg')
      
      expect(heading).toBeInTheDocument()
      expect(artworkCards).toHaveLength(0)
    })

    it('should handle single artwork', () => {
      vi.mocked(getAllArtworks).mockReturnValue([mockArtworks[0]])
      
      render(<HomePage />)
      expect(screen.getByText(mockArtworks[0].name)).toBeInTheDocument()
      expect(screen.queryByText(mockArtworks[1].name)).not.toBeInTheDocument()
    })

    it('should handle artwork with long name', () => {
      const longNameArtwork: Artwork = {
        id: '999',
        slug: 'long-name',
        name: 'A'.repeat(100),
        description: 'Test description',
        imageUrl: '/test.png',
      }
      
      vi.mocked(getAllArtworks).mockReturnValue([longNameArtwork])
      render(<HomePage />)
      
      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument()
    })

    it('should handle artwork with special characters in name', () => {
      const specialCharArtwork: Artwork = {
        id: '999',
        slug: 'special',
        name: 'Test & Special <Characters> "Quotes"',
        description: 'Test description',
        imageUrl: '/test.png',
      }
      
      vi.mocked(getAllArtworks).mockReturnValue([specialCharArtwork])
      render(<HomePage />)
      
      expect(screen.getByText('Test & Special <Characters> "Quotes"')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible image alt texts', () => {
      render(<HomePage />)
      
      mockArtworks.forEach((artwork) => {
        const img = screen.getByAltText(artwork.name)
        expect(img).toHaveAccessibleName(artwork.name)
      })
    })

    it('should have proper heading hierarchy', () => {
      render(<HomePage />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      
      expect(h1).toBeInTheDocument()
      expect(h2s).toHaveLength(mockArtworks.length)
    })
  })

  describe('Type Safety', () => {
    it('should handle readonly Artwork array type', () => {
      const readonlyArtworks: readonly Artwork[] = mockArtworks
      vi.mocked(getAllArtworks).mockReturnValue(readonlyArtworks)
      
      render(<HomePage />)
      expect(screen.getByText('Art')).toBeInTheDocument()
    })
  })

  describe('Component Return Type', () => {
    it('should return JSX.Element', () => {
      const result = HomePage()
      expect(result).toBeDefined()
      expect(result.type).toBe('div')
    })
  })

  describe('Performance', () => {
    it('should render efficiently with many artworks', () => {
      const manyArtworks: Artwork[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        slug: `artwork-${i}`,
        name: `Artwork ${i}`,
        description: `Description ${i}`,
        imageUrl: `/illustrations/artwork-${i}.png`,
      }))
      
      vi.mocked(getAllArtworks).mockReturnValue(manyArtworks)
      
      const start = performance.now()
      render(<HomePage />)
      const end = performance.now()
      
      expect(end - start).toBeLessThan(1000)
    })
  })
})