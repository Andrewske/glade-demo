import { getContactById } from '@/lib/data/contacts'
import { AISummary } from '@/components/overview/ai-summary'
import { PendingItems } from '@/components/overview/pending-items'
import { FollowupHistory } from '@/components/overview/followup-history'
import { SuggestedAction } from '@/components/overview/suggested-action'

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const contact = await getContactById(id)

  if (!contact) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-8 text-center">
          <p className="text-gray-400">Contact not found</p>
        </div>
      </div>
    )
  }

  const cards = [
    { component: <AISummary contact={contact} />, key: 'ai-summary' },
    { component: <PendingItems items={contact.pendingItems} />, key: 'pending-items' },
    { component: <FollowupHistory conversations={contact.conversations} />, key: 'followup-history' },
  ]

  if (contact.status === 'needs-attention') {
    cards.push({ component: <SuggestedAction contact={contact} />, key: 'suggested-action' })
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={card.key}
          className="animate-fade-in-up opacity-0"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {card.component}
        </div>
      ))}
    </div>
  )
}
