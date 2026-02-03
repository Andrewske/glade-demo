interface TabPageProps {
  params: Promise<{ id: string; tab: string }>
}

export default async function TabPage({ params }: TabPageProps) {
  const { tab } = await params

  // Format tab name for display
  const tabName = tab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="p-6">
      <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-white">{tabName}</h2>
        <p className="text-gray-400">Coming soon</p>
      </div>
    </div>
  )
}
