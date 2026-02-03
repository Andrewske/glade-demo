# Demo Feature Ideas for Glade Interview

**Based on:** Glade.ai help documentation research
**Goal:** Build small, impressive feature showcasing TypeScript/React/AI skills
**Time constraint:** Should be completable in reasonable timeframe (1-3 days)

---

## Top 3 Demo Feature Concepts

### 1. Case Health Dashboard (RECOMMENDED)

**Concept:** AI-powered dashboard that gives law firms real-time insights into case health and risk.

**What it shows:**
```
┌─────────────────────────────────────────────────┐
│ Case Health Overview                            │
├─────────────────────────────────────────────────┤
│ 🟢 12 cases on track                            │
│ 🟡 5 cases need attention                       │
│ 🔴 2 cases at risk                              │
└─────────────────────────────────────────────────┘

At Risk Cases:
┌────────────────────────────────────────────────────────────┐
│ Sarah Johnson - Chapter 7                                  │
│ Risk Score: 87/100                                         │
│                                                            │
│ ⚠️ Missing Documents: 3 critical items (21 days overdue)   │
│ ⚠️ Client Unresponsive: Last contact 14 days ago          │
│ ⚠️ Court Deadline: Schedules due in 8 days                │
│                                                            │
│ AI Recommendation:                                         │
│ "Schedule urgent call. Consider document collection       │
│  extension. 3 similar cases last month resulted in        │
│  dismissal without intervention."                          │
│                                                            │
│ [View Case] [Send Urgent Reminder] [Request Extension]    │
└────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**

**Backend (Node.js/TypeScript/PostgreSQL):**
```typescript
// API endpoint: GET /api/cases/health
interface CaseHealthScore {
  caseId: string;
  clientName: string;
  chapter: '7' | '13';
  riskScore: number; // 0-100
  riskFactors: RiskFactor[];
  aiRecommendation: string;
  nextActions: Action[];
}

interface RiskFactor {
  type: 'missing_documents' | 'unresponsive_client' | 'deadline_approaching' | 'incomplete_questionnaire';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  daysOverdue?: number;
}

// Risk scoring algorithm
function calculateCaseRisk(caseData: Case): number {
  let score = 0;

  // Missing documents (weighted by criticality)
  const criticalDocsCount = getMissingCriticalDocuments(caseData);
  score += criticalDocsCount * 15;

  // Client responsiveness
  const daysSinceContact = getDaysSinceLastContact(caseData);
  if (daysSinceContact > 14) score += 20;
  if (daysSinceContact > 21) score += 15;

  // Deadline proximity
  const daysUntilDeadline = getDaysUntilNextDeadline(caseData);
  if (daysUntilDeadline < 14) score += 25;
  if (daysUntilDeadline < 7) score += 20;

  // Questionnaire completion
  const questionnaireComplete = getQuestionnaireCompletionPercent(caseData);
  if (questionnaireComplete < 100) score += (100 - questionnaireComplete) / 5;

  return Math.min(score, 100);
}

// AI recommendation using GPT-4
async function generateAIRecommendation(
  caseData: Case,
  riskFactors: RiskFactor[]
): Promise<string> {
  const prompt = `
You are an AI assistant for a bankruptcy law firm using Glade.ai.

Case Details:
- Client: ${caseData.clientName}
- Chapter: ${caseData.chapter}
- Days since intake: ${caseData.daysSinceIntake}
- Court deadline: ${caseData.nextDeadline}

Risk Factors:
${riskFactors.map(rf => `- ${rf.description}`).join('\n')}

Provide a brief (2-3 sentences) actionable recommendation for the lawyer handling this case. Reference historical patterns if relevant.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
  });

  return response.choices[0].message.content;
}
```

**Frontend (React/TypeScript):**
```typescript
// CaseHealthDashboard.tsx
export function CaseHealthDashboard() {
  const { data: caseHealth, isLoading } = useQuery({
    queryKey: ['case-health'],
    queryFn: () => api.getCaseHealth(),
  });

  const atRiskCases = caseHealth?.filter(c => c.riskScore > 70);
  const needsAttention = caseHealth?.filter(c => c.riskScore > 40 && c.riskScore <= 70);
  const onTrack = caseHealth?.filter(c => c.riskScore <= 40);

  return (
    <div className="p-6">
      <CaseHealthOverview
        atRisk={atRiskCases?.length ?? 0}
        needsAttention={needsAttention?.length ?? 0}
        onTrack={onTrack?.length ?? 0}
      />

      {atRiskCases?.map(caseItem => (
        <CaseHealthCard key={caseItem.caseId} caseData={caseItem} />
      ))}
    </div>
  );
}

function CaseHealthCard({ caseData }: { caseData: CaseHealthScore }) {
  const severityColor = {
    critical: 'bg-red-100 border-red-500',
    high: 'bg-orange-100 border-orange-500',
    medium: 'bg-yellow-100 border-yellow-500',
    low: 'bg-blue-100 border-blue-500',
  };

  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {caseData.clientName} - Chapter {caseData.chapter}
          </h3>
          <div className="text-sm text-gray-600">
            Risk Score: {caseData.riskScore}/100
          </div>
        </div>
        <RiskScoreBadge score={caseData.riskScore} />
      </div>

      <div className="mt-4 space-y-2">
        {caseData.riskFactors.map((factor, idx) => (
          <RiskFactorItem key={idx} factor={factor} />
        ))}
      </div>

      <div className="mt-4 p-3 bg-white rounded border border-blue-200">
        <div className="text-sm font-semibold text-blue-900 mb-1">
          AI Recommendation:
        </div>
        <div className="text-sm text-gray-700">
          {caseData.aiRecommendation}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="btn-primary">View Case</button>
        <button className="btn-secondary">Send Urgent Reminder</button>
        <button className="btn-secondary">Request Extension</button>
      </div>
    </div>
  );
}
```

**Why This Works:**
- ✅ Shows understanding of law firm pain points (cases falling through cracks)
- ✅ Demonstrates AI integration (GPT-4 recommendations)
- ✅ Clean TypeScript/React code
- ✅ Practical business value (prevents case dismissals)
- ✅ Could integrate with existing Glade data
- ✅ Shows analytics/insights thinking beyond basic CRUD

**Complexity:** Medium (2-3 days)

---

### 2. Smart Document Classifier

**Concept:** AI-powered document upload that automatically categorizes and validates uploaded documents.

**What it shows:**
```
Client uploads: "bank_statement_jan_2024.pdf"

System:
1. Extracts text via OCR
2. Classifies document type with AI
3. Validates required fields are present
4. Auto-tags and organizes
5. Flags issues for review

Result:
✅ Document: Bank Statement
✅ Date Range: Jan 1-31, 2024
✅ Account Holder: Sarah Johnson (matches client)
✅ Required Fields: Present
⚠️ Warning: Statement older than 60 days (court requires recent)

Suggestions:
- Request updated statement
- Auto-added to "Income Verification" checklist
```

**Technical Implementation:**

```typescript
// Backend
interface DocumentClassification {
  documentId: string;
  originalFilename: string;
  classifiedType: DocumentType;
  confidence: number;
  extractedData: ExtractedDocumentData;
  validationResults: ValidationResult[];
  warnings: DocumentWarning[];
}

type DocumentType =
  | 'bank_statement'
  | 'pay_stub'
  | 'tax_return'
  | 'mortgage_statement'
  | 'utility_bill'
  | 'credit_report'
  | 'other';

async function classifyAndValidateDocument(
  fileBuffer: Buffer,
  clientId: string
): Promise<DocumentClassification> {
  // Extract text (using OCR for images/scanned PDFs)
  const extractedText = await extractTextFromPDF(fileBuffer);

  // Classify document type using GPT-4 Vision or text model
  const classification = await classifyDocument(extractedText);

  // Extract structured data based on document type
  const extractedData = await extractDocumentData(
    extractedText,
    classification.type
  );

  // Validate against requirements
  const validation = await validateDocument(
    classification.type,
    extractedData,
    clientId
  );

  return {
    documentId: generateId(),
    classifiedType: classification.type,
    confidence: classification.confidence,
    extractedData,
    validationResults: validation.results,
    warnings: validation.warnings,
  };
}

async function classifyDocument(text: string): Promise<{
  type: DocumentType;
  confidence: number;
}> {
  const prompt = `
Classify this document. Return JSON with type and confidence (0-1).

Types: bank_statement, pay_stub, tax_return, mortgage_statement, utility_bill, credit_report, other

Document text:
${text.substring(0, 2000)}

Response format:
{
  "type": "bank_statement",
  "confidence": 0.95,
  "reasoning": "Contains account number, transactions, bank header"
}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const result = JSON.parse(response.choices[0].message.content);
  return { type: result.type, confidence: result.confidence };
}
```

**Frontend:**
```typescript
export function DocumentUploadWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [classification, setClassification] = useState<DocumentClassification | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (uploadedFile: File) => {
    setIsProcessing(true);
    try {
      const result = await api.uploadAndClassifyDocument(uploadedFile);
      setClassification(result);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <FileDropzone onFileDrop={handleUpload} />

      {isProcessing && (
        <div className="text-center p-8">
          <Spinner />
          <p>Analyzing document...</p>
        </div>
      )}

      {classification && (
        <DocumentClassificationResult result={classification} />
      )}
    </div>
  );
}
```

**Why This Works:**
- ✅ Directly enhances existing "Document Collection" feature
- ✅ Shows GPT-4 Vision / document processing skills
- ✅ Solves real pain point (manual document categorization)
- ✅ Could save law firms hours per case
- ✅ Impressive AI demo without being too complex

**Complexity:** Medium-High (2-4 days)

---

### 3. Client Engagement Score Widget

**Concept:** Small widget showing client engagement metrics with AI-powered insights.

**What it shows:**
```
┌──────────────────────────────────────┐
│ Client Engagement Score              │
├──────────────────────────────────────┤
│ Sarah Johnson                        │
│ Engagement: 45/100 ⚠️                │
│                                      │
│ 📧 Email: 2 of 5 opened              │
│ 📱 SMS: 1 of 3 replied               │
│ 📋 Questionnaire: 60% complete       │
│ 📄 Documents: 2 of 5 uploaded        │
│ 🕒 Last Activity: 6 days ago         │
│                                      │
│ AI Insight:                          │
│ "Low engagement pattern similar to   │
│  clients who later withdrew. Suggest │
│  phone call to re-engage."           │
│                                      │
│ [Schedule Call] [Send Personal Note] │
└──────────────────────────────────────┘
```

**Technical Implementation:**

```typescript
interface ClientEngagementScore {
  clientId: string;
  score: number; // 0-100
  metrics: EngagementMetrics;
  trend: 'improving' | 'declining' | 'stable';
  aiInsight: string;
  suggestedActions: Action[];
}

interface EngagementMetrics {
  emailOpenRate: number;
  smsReplyRate: number;
  questionnaireProgress: number;
  documentUploadProgress: number;
  daysSinceLastActivity: number;
  totalInteractions: number;
}

function calculateEngagementScore(metrics: EngagementMetrics): number {
  const weights = {
    emailOpen: 15,
    smsReply: 20,
    questionnaireProgress: 25,
    documentProgress: 25,
    recency: 15,
  };

  const emailScore = metrics.emailOpenRate * weights.emailOpen;
  const smsScore = metrics.smsReplyRate * weights.smsReply;
  const questionnaireScore = (metrics.questionnaireProgress / 100) * weights.questionnaireProgress;
  const documentScore = (metrics.documentUploadProgress / 100) * weights.documentProgress;

  // Recency score (decays over time)
  const recencyScore = Math.max(
    0,
    weights.recency * (1 - metrics.daysSinceLastActivity / 14)
  );

  return Math.round(
    emailScore + smsScore + questionnaireScore + documentScore + recencyScore
  );
}

async function generateEngagementInsight(
  clientData: Client,
  score: number,
  metrics: EngagementMetrics
): Promise<string> {
  // Compare to historical patterns
  const similarCases = await db.query(`
    SELECT outcome
    FROM client_engagement_history
    WHERE engagement_score BETWEEN ${score - 10} AND ${score + 10}
    AND days_since_last_activity BETWEEN ${metrics.daysSinceLastActivity - 2} AND ${metrics.daysSinceLastActivity + 2}
  `);

  const withdrawalRate = similarCases.filter(c => c.outcome === 'withdrawn').length / similarCases.length;

  const prompt = `
Client engagement analysis:

Current Score: ${score}/100
Email open rate: ${metrics.emailOpenRate}
SMS reply rate: ${metrics.smsReplyRate}
Questionnaire progress: ${metrics.questionnaireProgress}%
Document upload progress: ${metrics.documentUploadProgress}%
Days since last activity: ${metrics.daysSinceLastActivity}

Historical context:
- Similar cases have ${(withdrawalRate * 100).toFixed(0)}% withdrawal rate

Provide a brief (1-2 sentences) insight and suggested action for the lawyer.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
  });

  return response.choices[0].message.content;
}
```

**Why This Works:**
- ✅ Small, focused feature (good for demo)
- ✅ Shows AI + analytics combination
- ✅ Addresses client retention (high-value problem)
- ✅ Clean, simple UI component
- ✅ Could be embedded in existing Glade dashboard

**Complexity:** Low-Medium (1-2 days)

---

## Technical Stack Recommendations

**All demos should use:**
- ✅ TypeScript (strict mode)
- ✅ React (with hooks, no classes per Kevin's FP preference)
- ✅ Next.js (App Router)
- ✅ PostgreSQL + Prisma
- ✅ Tailwind CSS
- ✅ OpenAI API (GPT-4)
- ✅ React Query for data fetching
- ✅ Zod for validation

**Project Structure:**
```
glade-demo/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes
│   │   └── dashboard/    # UI pages
│   ├── components/       # React components
│   ├── lib/
│   │   ├── ai/           # GPT-4 integration
│   │   ├── db/           # Prisma client
│   │   └── utils/        # Pure functions
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma
└── tests/
```

---

## Selection Criteria

**Choose based on:**

| Feature | Complexity | Impact | AI Showcase | Time |
|---------|-----------|--------|-------------|------|
| Case Health Dashboard | Medium | High | ⭐⭐⭐ | 2-3 days |
| Smart Document Classifier | Medium-High | High | ⭐⭐⭐⭐ | 2-4 days |
| Client Engagement Widget | Low-Medium | Medium | ⭐⭐ | 1-2 days |

**Recommendation: Start with Case Health Dashboard**

**Rationale:**
1. Best balance of complexity vs. time
2. Shows full-stack skills (frontend, backend, AI, database)
3. Addresses clear pain point from research
4. Impressive demo without being overwhelming
5. Could genuinely be useful to Glade
6. Demonstrates thinking beyond basic CRUD

---

## Next Steps

1. **Choose feature** (recommend Case Health Dashboard)
2. **Set up project:** `npx create-next-app@latest glade-demo --typescript --tailwind --app`
3. **Mock data:** Create realistic sample case data
4. **Build backend:** API routes + AI integration
5. **Build frontend:** Dashboard UI
6. **Deploy:** Vercel (free tier)
7. **Prepare demo:** Claude link + live URL

**Time allocation:**
- Day 1: Project setup, mock data, backend API
- Day 2: AI integration, frontend dashboard
- Day 3: Polish, deploy, test, prepare talking points
