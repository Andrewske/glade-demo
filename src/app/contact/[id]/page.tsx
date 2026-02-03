import { getContactById } from '@/lib/data/contacts'
import { AISummary } from '@/components/overview/ai-summary'
import { PendingItems } from '@/components/overview/pending-items'
import { FollowupHistory } from '@/components/overview/followup-history'
import { SuggestedAction } from '@/components/overview/suggested-action'

export default async function OverviewPage({
  params,
}: {
  params: { id: string }
}) {
  const contact = await getContactById(params.id)

  if (!contact) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-white/10 bg-[#1a1a1a] p-8 text-center">
          <p className="text-gray-400">Contact not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
      <AISummary contact={contact} />
      <PendingItems items={contact.pendingItems} />
      <FollowupHistory conversations={contact.conversations} />
      {contact.status === 'needs-attention' && (
        <SuggestedAction contact={contact} />
      )}
    </div>
  )
}
