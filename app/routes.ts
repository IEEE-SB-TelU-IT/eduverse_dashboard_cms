import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('categories', 'routes/categories.tsx'),
  route('blog', 'routes/blog.tsx'),
] satisfies RouteConfig
