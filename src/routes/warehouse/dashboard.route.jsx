import { rootRoute } from "@/main"
import { warehouseRoute } from "./warehouse.route"
import Dashboard from "@/pages/Warehouse/Dashboard"
import { createRoute } from "@tanstack/react-router"

export const warehouseDashboardRoute = createRoute({
  getParentRoute: () => warehouseRoute,
  path: 'dashboard',
  component : Dashboard
})