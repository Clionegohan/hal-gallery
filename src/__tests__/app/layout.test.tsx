import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

vi.mock('@/app/globals.css', () => ({}))

describe('RootLayout', () => {
  describe('Metadata', () => {
    it('should export metadata object', () => {
      expect(metadata).toBeDefined()
      expect(typeof metadata).toBe('object')
    })

    it('should have correct title', () => {
      expect(metadata.title).toBe('hal-gallery')
    })

    it('should have correct description', () => {
      expect(metadata.description).toBe(
        'halが好きな絵師さんにskebにて依頼したイラストを自慢するだけのサイトです'
      )
    })

    it('should not have extra metadata properties', () => {
      const keys = Object.keys(metadata)
      expect(keys).toEqual(['title', 'description'])
    })
  })

  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      )
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(
        <RootLayout>
          <div data-testid="child-content">Child Element</div>
        </RootLayout>
      )
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      render(
        <RootLayout>
          <div>First Child</div>
          <div>Second Child</div>
        </RootLayout>
      )
      expect(screen.getByText('First Child')).toBeInTheDocument()
      expect(screen.getByText('Second Child')).toBeInTheDocument()
    })
  })

  describe('HTML Structure', () => {
    it('should render html element with lang attribute', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const html = container.querySelector('html')
      expect(html).toBeInTheDocument()
      expect(html).toHaveAttribute('lang', 'ja')
    })

    it('should render body element', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toBeInTheDocument()
    })

    it('should have correct body classes', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toHaveClass('mx-auto', 'max-w-5xl', 'bg-black', 'text-white')
    })
  })

  describe('Header', () => {
    it('should render header element', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    it('should render header with correct text', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      expect(screen.getByText('hal gallery')).toBeInTheDocument()
    })

    it('should have correct header classes', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const header = container.querySelector('header')
      expect(header).toHaveClass('border-b', 'bg-black', 'px-4', 'py-3', 'font-semibold')
    })
  })

  describe('Main Content', () => {
    it('should render main element', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })

    it('should have correct main classes', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const main = container.querySelector('main')
      expect(main).toHaveClass('px-4', 'py-8')
    })

    it('should render children inside main', () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="main-child">Main Content</div>
        </RootLayout>
      )
      const main = container.querySelector('main')
      const child = screen.getByTestId('main-child')
      expect(main).toContainElement(child)
    })
  })

  describe('Footer', () => {
    it('should render footer element', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('should have correct footer classes', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('border-t', 'bg-black', 'px-4', 'py-6', 'text-gray-400')
    })

    it('should render copyright text with current year', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const currentYear = new Date().getFullYear()
      const footer = container.querySelector('footer')
      expect(footer?.textContent).toContain(`© ${currentYear} hal gallery`)
    })
  })

  describe('Layout Structure', () => {
    it('should have header, main, and footer in correct order', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      const children = Array.from(body?.children || [])
      
      expect(children[0].tagName).toBe('HEADER')
      expect(children[1].tagName).toBe('MAIN')
      expect(children[2].tagName).toBe('FOOTER')
    })

    it('should render all three layout sections', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      expect(container.querySelector('header')).toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('footer')).toBeInTheDocument()
    })
  })

  describe('Theme and Styling', () => {
    it('should use black background theme', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toHaveClass('bg-black')
    })

    it('should use white text color', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toHaveClass('text-white')
    })

    it('should have maximum width constraint', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toHaveClass('max-w-5xl')
    })

    it('should center content horizontally', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const body = container.querySelector('body')
      expect(body).toHaveClass('mx-auto')
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      render(
        <RootLayout>
          {null}
        </RootLayout>
      )
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should handle string children', () => {
      render(
        <RootLayout>
          Plain text content
        </RootLayout>
      )
      expect(screen.getByText('Plain text content')).toBeInTheDocument()
    })

    it('should handle array of children', () => {
      render(
        <RootLayout>
          {[
            <div key="1">First</div>,
            <div key="2">Second</div>,
          ]}
        </RootLayout>
      )
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper HTML5 semantic structure', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      expect(container.querySelector('header')).toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('footer')).toBeInTheDocument()
    })

    it('should have correct language attribute for screen readers', () => {
      const { container } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      const html = container.querySelector('html')
      expect(html).toHaveAttribute('lang', 'ja')
    })

    it('should have accessible landmark regions', () => {
      render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('Year Calculation', () => {
    it('should calculate year at render time', () => {
      const { container, rerender } = render(
        <RootLayout>
          <div>Test</div>
        </RootLayout>
      )
      
      const year1 = new Date().getFullYear()
      expect(container.textContent).toContain(`© ${year1}`)
      
      rerender(
        <RootLayout>
          <div>Test Updated</div>
        </RootLayout>
      )
      
      const year2 = new Date().getFullYear()
      expect(container.textContent).toContain(`© ${year2}`)
    })
  })
})