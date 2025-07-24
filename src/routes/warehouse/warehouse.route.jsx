import { rootRoute } from "@/main"
import WarehouseLayout from "@/layouts/WarehouseLayout"
import { createRoute } from "@tanstack/react-router"

export const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/warehouse',
  component: WarehouseLayout
})