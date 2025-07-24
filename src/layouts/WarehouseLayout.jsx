import { Outlet } from '@tanstack/react-router'

export default function WarehouseLayout() {
  return (
    <div>
      <Outlet /> {/* Nested children will render here */}
    </div>
  )
}
