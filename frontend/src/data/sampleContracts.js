export const SAMPLE_CONTRACTS = [
  {
    id: 'sample-nda',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    category: 'Confidentiality',
    description: 'Standard agreement protecting proprietary secrets between two negotiating businesses.',
    overallRisk: 'Medium',
    riskScore: 42,
    summary: 'This contract requires both parties to keep shared business secrets confidential for 3 years. However, section 4 contains an overly broad definition of Confidential Information and Section 6 includes an unlimited indemnification clause that poses financial risk.',
    fullText: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into by and between Party A and Party B ("Parties").

1. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" shall include all information, technical data, trade secrets, financial records, customer lists, business plans, software source code, vendor lists, oral disclosures, and all notes or analyses prepared by either Party, whether or not marked as "Confidential".

2. OBLIGATIONS OF RECEIVING PARTY.
The Receiving Party agrees to hold and maintain the Confidential Information in strictest confidence for a period of three (3) years from the date of disclosure. The Receiving Party shall not, without prior written consent of the Disclosing Party, disclose any portion of the Confidential Information to any third party.

3. EXCLUSIONS FROM CONFIDENTIALITY.
Confidentiality obligations do not apply to information that: (a) is or becomes publicly known through no breach of Receiving Party; (b) was already in lawful possession prior to disclosure; or (c) is independently developed without reference to Disclosing Party's information.

4. INJUNCTIVE RELIEF & DAMAGES.
In the event of a breach or threatened breach, Disclosing Party shall be entitled to seek immediate injunctive relief without the necessity of posting a bond or proving actual monetary damages.

5. INDEMNIFICATION.
Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party against any and all claims, losses, liabilities, costs, damages, and attorney's fees arising out of any unauthorized disclosure or use of Confidential Information by Receiving Party.`,
    clauses: [
      {
        id: 'c1',
        title: 'Definition of Confidential Information',
        type: 'Scope',
        risk: 'Medium',
        originalText: '"Confidential Information" shall include all information... whether or not marked as "Confidential".',
        simplifiedText: 'Anything shared between the parties counts as secret, even if nobody labeled or explicitly marked it as confidential at the time it was given.',
        recommendation: 'Negotiate to specify that oral disclosures must be confirmed in writing within 14 days to be considered confidential.'
      },
      {
        id: 'c2',
        title: 'Non-Disclosure Duration',
        type: 'Term',
        risk: 'Low',
        originalText: '...hold and maintain the Confidential Information in strictest confidence for a period of three (3) years from the date of disclosure.',
        simplifiedText: 'You must keep these secrets safe for 3 years after receiving them.',
        recommendation: 'Standard duration for commercial NDAs. Acceptable.'
      },
      {
        id: 'c3',
        title: 'Injunctive Relief Without Bond',
        type: 'Remedies',
        risk: 'High',
        originalText: '...entitled to seek immediate injunctive relief without the necessity of posting a bond or proving actual monetary damages.',
        simplifiedText: 'If they suspect you breached the deal, they can get a court order to freeze your operations immediately without having to prove financial damages upfront.',
        recommendation: 'Remove the clause waiving the bond requirement so they must present credible evidence before freezing your business activities.'
      },
      {
        id: 'c4',
        title: 'Uncapped Indemnification',
        type: 'Liability',
        risk: 'Critical',
        originalText: 'Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party against any and all claims, losses, liabilities, costs, damages, and attorney\'s fees...',
        simplifiedText: 'If you accidentally leak secret info, you have to pay for ALL of their losses, legal expenses, and court judgments with NO spending limit.',
        recommendation: 'Cap indemnification liability to a specific dollar amount (e.g. $50,000 or 1x fees paid) to avoid unlimited financial exposure.'
      }
    ]
  },
  {
    id: 'sample-freelance',
    title: 'Freelance Design & Development Agreement',
    category: 'Independent Work',
    description: 'Contract between a client and an independent software developer/creator.',
    overallRisk: 'High',
    riskScore: 78,
    summary: 'Danger: Section 3 forces you to transfer Intellectual Property before payment is received, and Section 7 includes a non-solicitation penalty with liquid damages of $25,000 per violation.',
    fullText: `INDEPENDENT CONTRACTOR AGREEMENT

1. SERVICES AND COMPENSATION.
Contractor agrees to perform web application design and software engineering services. Client shall pay Contractor $8,000 upon successful milestone completion within 60 days of invoice receipt.

2. WORK FOR HIRE & INTELLECTUAL PROPERTY.
All materials, code, designs, and deliverables created by Contractor shall be deemed "Work Made for Hire". All title, ownership, copyright, and patent rights immediately vest in Client upon creation, regardless of whether payment has been remitted.

3. WARRANTIES AND REPRESENTATIONS.
Contractor warrants that all code provided is original and does not infringe upon any third-party patents or open-source licenses. Contractor shall personally indemnify Client against any third-party copyright claims.

4. TERMINATION FOR CONVENIENCE.
Client may terminate this Agreement at any time without cause upon 24 hours written notice. Upon termination, Contractor must cease all work and Client shall only pay for work accepted prior to notice.

5. NON-SOLICITATION & LIQUIDATED DAMAGES.
Contractor agrees not to solicit or perform services for any client or partner of Client during the term and for two (2) years thereafter. Violation of this clause shall result in liquidated damages of $25,000 per occurrence.`,
    clauses: [
      {
        id: 'fc1',
        title: 'Payment Terms (Net 60)',
        type: 'Payment',
        risk: 'Medium',
        originalText: 'Client shall pay Contractor $8,000 upon successful milestone completion within 60 days of invoice receipt.',
        simplifiedText: 'You will have to wait up to 60 days after submitting an invoice to receive your money.',
        recommendation: 'Change payment terms from Net 60 to Net 15 or Net 30, and require a 30% upfront deposit before work begins.'
      },
      {
        id: 'fc2',
        title: 'IP Transfer Before Payment',
        type: 'Intellectual Property',
        risk: 'Critical',
        originalText: 'All title, ownership, copyright... immediately vest in Client upon creation, regardless of whether payment has been remitted.',
        simplifiedText: 'The client owns all your code immediately when you write it, even if they refuse or fail to pay your invoice.',
        recommendation: 'Rephrase so IP transfers ONLY UPON FULL PAYMENT of all invoices.'
      },
      {
        id: 'fc3',
        title: 'Termination Notice & Payment for Unaccepted Work',
        type: 'Termination',
        risk: 'High',
        originalText: 'Client may terminate... upon 24 hours written notice... Client shall only pay for work accepted prior to notice.',
        simplifiedText: 'Client can cancel with 1 day notice and refuse to pay for work you did that they haven\'t officially "accepted" yet.',
        recommendation: 'Require 14 days written notice and payment for all hours worked up to the date of cancellation.'
      },
      {
        id: 'fc4',
        title: 'Non-Solicitation & Liquidated Damages ($25k)',
        type: 'Non-Compete',
        risk: 'High',
        originalText: 'Violation of this clause shall result in liquidated damages of $25,000 per occurrence.',
        simplifiedText: 'If you work with any past or present customer of your client for 2 years, you automatically owe them $25,000 as a penalty.',
        recommendation: 'Limit non-solicitation strictly to direct client contact roster and remove fixed arbitrary penalty fees.'
      }
    ]
  },
  {
    id: 'sample-saas',
    title: 'SaaS Software Terms of Service',
    category: 'Software & Technology',
    description: 'Standard end-user terms of service for cloud applications and digital platforms.',
    overallRisk: 'Low',
    riskScore: 24,
    summary: 'Fairly standard SaaS terms. High availability SLAs included, limited liability to fees paid in last 12 months, auto-renewal with 30-day cancellation window.',
    fullText: `TERMS OF SERVICE - CLOUD PLATFORM

1. SUBSCRIPTION GRANT.
Company grants Subscriber a non-exclusive, non-transferable right to access and use the Cloud Service during the Subscription Term.

2. SERVICE LEVEL AGREEMENT (SLA).
Company guarantees 99.9% monthly uptime. If uptime falls below 99.9%, Subscriber is entitled to a prorated service credit equal to 10% of monthly subscription fees.

3. LIMITATION OF LIABILITY.
To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, or consequential damages. Total cumulative liability of either party is capped at the fees paid in the twelve (12) months preceding the incident.

4. AUTOMATIC RENEWAL.
Subscriptions automatically renew for successive 1-year terms unless either party provides written notice of non-renewal at least thirty (30) days prior to expiration.`,
    clauses: [
      {
        id: 'sc1',
        title: 'Service Guarantee (99.9% SLA)',
        type: 'Performance',
        risk: 'Low',
        originalText: 'Company guarantees 99.9% monthly uptime... entitled to a prorated service credit equal to 10%...',
        simplifiedText: 'If the app goes down for more than 43 minutes in a month, you get a 10% discount refund credit.',
        recommendation: 'Standard industry SLA for business cloud software.'
      },
      {
        id: 'sc2',
        title: 'Liability Cap (12-Month Fees)',
        type: 'Liability',
        risk: 'Low',
        originalText: 'Total cumulative liability of either party is capped at the fees paid in the twelve (12) months preceding the incident.',
        simplifiedText: 'If something breaks or data is lost, the most you can sue them for (and vice versa) is what you paid over the past year.',
        recommendation: 'Very standard, fair, and balanced clause.'
      },
      {
        id: 'sc3',
        title: 'Auto-Renewal Notice',
        type: 'Renewal',
        risk: 'Medium',
        originalText: 'Subscriptions automatically renew... unless written notice is provided at least thirty (30) days prior.',
        simplifiedText: 'Your subscription will renew automatically every year unless you send a cancellation email 30 days before the renewal date.',
        recommendation: 'Set a calendar reminder 45 days before subscription renewal.'
      }
    ]
  }
];
