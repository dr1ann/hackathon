import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import './styles.css'
import reportWebVitals from './reportWebVitals.js'
import { lazy } from 'react'
import App from './App.jsx'
import { warehouseRoute } from './routes/warehouse/warehouse.route.jsx'
import { warehouseDashboardRoute } from './routes/warehouse/dashboard.route.jsx'
import WarehouseLayout from './layouts/WarehouseLayout.jsx'
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const MapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'map',
  component:lazy(() => import('./pages/MapPage')) 
})


 
const routeTree = rootRoute.addChildren([
   indexRoute,
   MapRoute,
   warehouseRoute.addChildren([warehouseDashboardRoute])
  ])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})


const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
