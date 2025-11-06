# Test Suite for hal-gallery

This directory contains comprehensive unit tests for the hal-gallery project using Vitest and React Testing Library.

## Test Files

### `lib/artworks.test.ts`
Tests for the `getAllArtworks` function in `src/lib/artworks.ts`:
- Basic functionality and return types
- Data integrity validation
- Type safety checks
- Edge case handling
- Performance considerations
- Integration with ARTWORKS constant

### `app/page.test.tsx`
Tests for the HomePage component in `src/app/page.tsx`:
- Component rendering and structure
- Artwork display and styling
- Data integration with getAllArtworks
- Edge cases (empty data, special characters, etc.)
- Accessibility features
- Performance with large datasets

### `app/layout.test.tsx`
Tests for the RootLayout component in `src/app/layout.tsx`:
- Metadata export and values
- HTML structure and semantic markup
- Header, main, and footer sections
- Theme and styling classes
- Edge cases for children props
- Accessibility and landmark regions
- Dynamic year calculation in footer

## Running Tests

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Coverage

The test suite aims for comprehensive coverage of:
- Happy path scenarios
- Edge cases and error conditions
- Type safety and TypeScript interfaces
- Accessibility requirements
- Performance characteristics
- Component integration

## Testing Philosophy

These tests follow best practices:
- Descriptive test names that explain intent
- Organized into logical describe blocks
- Testing behavior, not implementation details
- Proper mocking of dependencies
- Accessibility-first approach using semantic queries