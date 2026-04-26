import DashboardShell from '@/components/DashboardShell'
import { getCurrentContext } from '@/lib/centre-utils'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getCurrentContext()

  return (
    <DashboardShell
      centreName={ctx.company.name}
      ownerName={ctx.teacher.name}
      isOwner={ctx.teacher.is_owner}
    >
      {children}
    </DashboardShell>
  )
}
