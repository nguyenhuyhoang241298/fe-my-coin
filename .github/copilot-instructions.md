---
description: 'Next.js + Tailwind development standards and instructions'
applyTo: '**/*.tsx, **/*.ts, **/*.jsx, **/*.js, **/*.css'
---

# Next.js + Tailwind Development Instructions

Instructions for high-quality Next.js applications with Tailwind CSS styling and TypeScript.

## Project Context

- Latest Next.js (App Router)
- TypeScript for type safety
- Tailwind CSS for styling

## Development Standards

### Architecture
- App Router with server and client components
- Group routes by feature/domain
- Implement proper error boundaries
- Use React Server Components by default
- Leverage static optimization where possible

### TypeScript
- Strict mode enabled
- Clear type definitions
- Proper error handling with type guards
- Zod for runtime type validation

### Common components
- Use shadcn/ui for common UI components
- Follow component composition patterns

### Folder structure for specific features
- api.ts for client API calls
- types.ts for shared types and interfaces
- helpers.ts for utility functions
- constants.ts for shared constants
- hooks.ts for @tanstack/react-query and custom hooks
- components/ for shared components
- actions.ts for server actions
- stores.ts for Zustand stores

### Styling
- Tailwind CSS with consistent color palette
- Responsive design patterns
- Dark mode support
- Follow container queries best practices
- Maintain semantic HTML structure

### Form
- React Hook Form for form state management
- Zod for schema validation
- Accessible form elements
- Clear error messages and validation feedback

### State Management
- React Server Components for server state
- Zustand for client state management
- Proper loading and error states
- Optimistic updates where appropriate

### Data Fetching
- @tanstack/react-query for prefetch and client data fetching
- React Suspense for loading states
- Proper error handling and retry logic
- Cache invalidation strategies

### Security
- Input validation and sanitization
- Proper authentication checks
- CSRF protection
- Rate limiting implementation
- Secure API route handling

### Performance
- Image optimization with next/image
- Font optimization with next/font
- Route prefetching
- Proper code splitting
- Bundle size optimization

## Implementation Process
1. Plan component hierarchy
2. Define types and interfaces
3. Implement server-side logic
4. Build client components
5. Add proper error handling
6. Implement responsive styling
7. Add loading states
