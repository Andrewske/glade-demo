import type { ContactWithContext, MockSummary } from './types'

// Helper to create dates relative to now
const daysAgo = (days: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

export const contacts: ContactWithContext[] = [
  // Maria Garcia - Red status: 3 follow-ups, 12 days no response
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '(555) 123-4567',
    chapter: '7',
    avatarColor: '#ec4899',
    createdAt: daysAgo(45),
    conversations: [
      {
        id: 'conv-1',
        contactId: 'maria-garcia',
        type: 'system',
        content: 'Case initiated - Chapter 7 bankruptcy filing',
        timestamp: daysAgo(45),
      },
      {
        id: 'conv-2',
        contactId: 'maria-garcia',
        type: 'attorney-message',
        content: 'Hi Maria, welcome! I need you to upload your pay stubs and bank statements to proceed with your filing.',
        timestamp: daysAgo(40),
      },
      {
        id: 'conv-3',
        contactId: 'maria-garcia',
        type: 'client-response',
        content: 'Thank you! I uploaded some documents. Still looking for the pay stubs.',
        timestamp: daysAgo(38),
      },
      {
        id: 'conv-4',
        contactId: 'maria-garcia',
        type: 'ai-followup',
        content: 'Hi Maria, checking in on those pay stubs. Do you need help locating them?',
        timestamp: daysAgo(30),
      },
      {
        id: 'conv-5',
        contactId: 'maria-garcia',
        type: 'ai-followup',
        content: 'Maria, we still need your pay stubs and bank statements to move forward. Can you provide an update?',
        timestamp: daysAgo(20),
      },
      {
        id: 'conv-6',
        contactId: 'maria-garcia',
        type: 'ai-followup',
        content: 'Hi Maria, following up again on the missing documents. Please let me know if you need assistance.',
        timestamp: daysAgo(12),
      },
    ],
    pendingItems: {
      documents: {
        required: 6,
        uploaded: 4,
        items: [
          { name: 'Tax Returns', status: 'uploaded' },
          { name: 'ID Copy', status: 'uploaded' },
          { name: 'Credit Report', status: 'uploaded' },
          { name: 'Utility Bills', status: 'uploaded' },
          { name: 'Pay Stubs (Last 3 months)', status: 'missing' },
          { name: 'Bank Statements (Last 6 months)', status: 'missing' },
        ],
      },
      forms: {
        complete: false,
        name: 'Statement of Financial Affairs',
      },
      invoices: {
        total: 1500,
        paid: 500,
        overdue: false,
      },
    },
    notes: [
      'Client is juggling two jobs - may be difficult to reach during business hours',
      'Expressed anxiety about the process, may need extra reassurance',
    ],
    lastClientResponse: daysAgo(38),
    followUpCount: 3,
  },

  // John Smith - Green status: Recent follow-up, on track
  {
    id: 'john-smith',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 234-5678',
    chapter: '13',
    avatarColor: '#3b82f6',
    createdAt: daysAgo(30),
    conversations: [
      {
        id: 'conv-7',
        contactId: 'john-smith',
        type: 'system',
        content: 'Case initiated - Chapter 13 bankruptcy filing',
        timestamp: daysAgo(30),
      },
      {
        id: 'conv-8',
        contactId: 'john-smith',
        type: 'attorney-message',
        content: 'Hi John, thanks for choosing our firm. I\'ve reviewed your initial documents and everything looks good so far.',
        timestamp: daysAgo(28),
      },
      {
        id: 'conv-9',
        contactId: 'john-smith',
        type: 'client-response',
        content: 'Great! What are the next steps?',
        timestamp: daysAgo(27),
      },
      {
        id: 'conv-10',
        contactId: 'john-smith',
        type: 'attorney-message',
        content: 'I need you to complete the repayment plan form and provide your last 3 pay stubs.',
        timestamp: daysAgo(26),
      },
      {
        id: 'conv-11',
        contactId: 'john-smith',
        type: 'client-response',
        content: 'Just uploaded the pay stubs. Working on the repayment plan now.',
        timestamp: daysAgo(24),
      },
      {
        id: 'conv-12',
        contactId: 'john-smith',
        type: 'ai-followup',
        content: 'Thanks for the pay stubs! Let me know if you have questions on the repayment plan form.',
        timestamp: daysAgo(5),
      },
    ],
    pendingItems: {
      documents: {
        required: 4,
        uploaded: 4,
        items: [
          { name: 'Tax Returns', status: 'uploaded' },
          { name: 'Pay Stubs', status: 'uploaded' },
          { name: 'Vehicle Registration', status: 'uploaded' },
          { name: 'Mortgage Statement', status: 'uploaded' },
        ],
      },
      forms: {
        complete: false,
        name: 'Chapter 13 Repayment Plan',
      },
      invoices: {
        total: 2500,
        paid: 2500,
        overdue: false,
      },
    },
    notes: [
      'Very organized and responsive client',
    ],
    lastClientResponse: daysAgo(24),
    followUpCount: 1,
  },

  // David Chen - Amber status: Uploaded docs 2 days ago, needs review
  {
    id: 'david-chen',
    name: 'David Chen',
    email: 'david.chen@email.com',
    phone: '(555) 345-6789',
    chapter: '7',
    avatarColor: '#10b981',
    createdAt: daysAgo(20),
    conversations: [
      {
        id: 'conv-13',
        contactId: 'david-chen',
        type: 'system',
        content: 'Case initiated - Chapter 7 bankruptcy filing',
        timestamp: daysAgo(20),
      },
      {
        id: 'conv-14',
        contactId: 'david-chen',
        type: 'attorney-message',
        content: 'Hi David, I need several documents to get started. Please upload your tax returns, pay stubs, and bank statements.',
        timestamp: daysAgo(18),
      },
      {
        id: 'conv-14b',
        contactId: 'david-chen',
        type: 'client-response',
        content: 'Got it, I\'ll gather those documents this weekend.',
        timestamp: daysAgo(16),
      },
      {
        id: 'conv-15',
        contactId: 'david-chen',
        type: 'ai-followup',
        content: 'Following up on those documents when you get a chance.',
        timestamp: daysAgo(10),
      },
      {
        id: 'conv-16',
        contactId: 'david-chen',
        type: 'client-response',
        content: 'Sorry for the delay! Just uploaded everything.',
        timestamp: daysAgo(2),
      },
    ],
    pendingItems: {
      documents: {
        required: 5,
        uploaded: 5,
        items: [
          { name: 'Tax Returns (Last 2 years)', status: 'uploaded' },
          { name: 'Pay Stubs', status: 'uploaded' },
          { name: 'Bank Statements', status: 'uploaded' },
          { name: 'Credit Card Statements', status: 'uploaded' },
          { name: 'Lease Agreement', status: 'uploaded' },
        ],
      },
      forms: {
        complete: true,
        name: 'Means Test Calculation',
      },
      invoices: {
        total: 1800,
        paid: 900,
        overdue: false,
      },
    },
    notes: [
      'Works night shifts - best to contact via email',
      'All documents uploaded on Jan 29, need attorney review',
    ],
    lastClientResponse: daysAgo(2),
    followUpCount: 1,
  },

  // Sarah Johnson - Green status: All good, awaiting final docs
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 456-7890',
    chapter: '13',
    avatarColor: '#f59e0b',
    createdAt: daysAgo(60),
    conversations: [
      {
        id: 'conv-17',
        contactId: 'sarah-johnson',
        type: 'system',
        content: 'Case initiated - Chapter 13 bankruptcy filing',
        timestamp: daysAgo(60),
      },
      {
        id: 'conv-18',
        contactId: 'sarah-johnson',
        type: 'attorney-message',
        content: 'Hi Sarah, great job on getting all your documents in! We\'re almost ready to file.',
        timestamp: daysAgo(15),
      },
      {
        id: 'conv-19',
        contactId: 'sarah-johnson',
        type: 'client-response',
        content: 'Thank you! What else do you need from me?',
        timestamp: daysAgo(14),
      },
      {
        id: 'conv-20',
        contactId: 'sarah-johnson',
        type: 'attorney-message',
        content: 'Just waiting on the court to process your credit counseling certificate. Should hear back next week.',
        timestamp: daysAgo(13),
      },
      {
        id: 'conv-21',
        contactId: 'sarah-johnson',
        type: 'ai-followup',
        content: 'Quick update: Still waiting on the court. I\'ll let you know as soon as we get approval.',
        timestamp: daysAgo(3),
      },
    ],
    pendingItems: {
      documents: {
        required: 6,
        uploaded: 6,
        items: [
          { name: 'Tax Returns', status: 'uploaded' },
          { name: 'Pay Stubs', status: 'uploaded' },
          { name: 'Bank Statements', status: 'uploaded' },
          { name: 'Vehicle Title', status: 'uploaded' },
          { name: 'Home Appraisal', status: 'uploaded' },
          { name: 'Credit Counseling Certificate', status: 'uploaded' },
        ],
      },
      forms: {
        complete: true,
        name: 'Chapter 13 Plan',
      },
      invoices: {
        total: 3000,
        paid: 3000,
        overdue: false,
      },
    },
    notes: [
      'Model client - very organized and proactive',
      'Court processing credit counseling certificate',
    ],
    lastClientResponse: daysAgo(14),
    followUpCount: 1,
  },

  // Robert Wilson - Red status: Overdue invoice + missing docs
  {
    id: 'robert-wilson',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '(555) 567-8901',
    chapter: '7',
    avatarColor: '#8b5cf6',
    createdAt: daysAgo(50),
    conversations: [
      {
        id: 'conv-22',
        contactId: 'robert-wilson',
        type: 'system',
        content: 'Case initiated - Chapter 7 bankruptcy filing',
        timestamp: daysAgo(50),
      },
      {
        id: 'conv-23',
        contactId: 'robert-wilson',
        type: 'attorney-message',
        content: 'Hi Robert, I need your tax returns and an updated list of creditors to proceed.',
        timestamp: daysAgo(48),
      },
      {
        id: 'conv-24',
        contactId: 'robert-wilson',
        type: 'client-response',
        content: 'Will get those to you this week.',
        timestamp: daysAgo(46),
      },
      {
        id: 'conv-25',
        contactId: 'robert-wilson',
        type: 'ai-followup',
        content: 'Checking in on those documents and the outstanding invoice.',
        timestamp: daysAgo(35),
      },
      {
        id: 'conv-26',
        contactId: 'robert-wilson',
        type: 'ai-followup',
        content: 'Robert, we really need those documents to move forward. Also, your invoice is now 30 days past due.',
        timestamp: daysAgo(20),
      },
      {
        id: 'conv-27',
        contactId: 'robert-wilson',
        type: 'client-response',
        content: 'I know, I\'m sorry. Had some family emergencies. Will try to get everything sorted this week.',
        timestamp: daysAgo(18),
      },
      {
        id: 'conv-28',
        contactId: 'robert-wilson',
        type: 'ai-followup',
        content: 'I understand things have been difficult. Let me know if we need to discuss a payment plan for the invoice.',
        timestamp: daysAgo(8),
      },
    ],
    pendingItems: {
      documents: {
        required: 5,
        uploaded: 2,
        items: [
          { name: 'ID Copy', status: 'uploaded' },
          { name: 'Social Security Card', status: 'uploaded' },
          { name: 'Tax Returns (Last 2 years)', status: 'missing' },
          { name: 'Creditor List', status: 'missing' },
          { name: 'Income Verification', status: 'missing' },
        ],
      },
      forms: {
        complete: false,
        name: 'Schedule of Assets and Liabilities',
      },
      invoices: {
        total: 2000,
        paid: 500,
        overdue: true,
      },
    },
    notes: [
      'Experiencing personal difficulties - may need extra patience',
      'Invoice 45 days overdue - consider payment plan options',
    ],
    lastClientResponse: daysAgo(18),
    followUpCount: 3,
  },
]

export const MOCK_SUMMARIES: Record<string, MockSummary> = {
  'maria-garcia': {
    summary: 'Maria is a Chapter 7 bankruptcy client who has been unresponsive for 12 days despite 3 follow-up attempts. She has uploaded 4/6 required documents but is missing pay stubs and bank statements.',
    escalation: 'Hi Maria, I know gathering documents can be tough. Would a quick 5-minute call help? I can walk you through exactly what we need from your employer for the pay stubs.',
  },
  'john-smith': {
    summary: 'John is a Chapter 13 client making steady progress. All documents have been uploaded and reviewed. He is currently working on the repayment plan form, with recent follow-up sent 5 days ago.',
  },
  'david-chen': {
    summary: 'David uploaded all required documents 2 days ago after a brief delay. Everything appears complete and ready for attorney review to proceed with his Chapter 7 filing.',
  },
  'sarah-johnson': {
    summary: 'Sarah is a model Chapter 13 client with all documents complete and forms filed. Case is waiting on court processing of her credit counseling certificate before final filing.',
  },
  'robert-wilson': {
    summary: 'Robert has an overdue invoice (45 days past due) and is missing 3 critical documents despite 3 follow-up attempts. He mentioned family emergencies affecting his ability to provide documentation.',
    escalation: 'Hi Robert, I want to help you through this difficult time. Let\'s schedule a brief call to discuss a payment plan for the invoice and figure out the easiest way to get those remaining documents. Would tomorrow afternoon work?',
  },
}
