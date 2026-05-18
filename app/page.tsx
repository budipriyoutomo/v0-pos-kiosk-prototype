import { KioskProvider } from '@/lib/kiosk-store'
import { KioskApp } from '@/components/kiosk/KioskApp'

export default function Page() {
  return (
    <KioskProvider>
      <KioskApp />
    </KioskProvider>
  )
}
