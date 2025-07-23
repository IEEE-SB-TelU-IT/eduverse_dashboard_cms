import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  layout('layout/auth-layout.tsx', [index('routes/auth/login.tsx')]),

  layout('layout/dashboard-layout.tsx', [
    route('dashboard', 'routes/home.tsx'),
  ]),
] satisfies RouteConfig
