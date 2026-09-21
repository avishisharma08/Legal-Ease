export const LEGAL_DICTIONARY = [
  {
    id: 'term-1',
    term: 'Indemnification',
    latin: 'Indemnis (unharmed)',
    category: 'Liability & Risk',
    simpleDefinition: 'Promising to cover all financial losses, legal costs, and damages if the other person gets sued because of something you did.',
    realWorldExample: 'If a client gets sued for copyright theft because of artwork you drew for them, an indemnification clause means you pay for their lawyers and court fines.',
    riskLevel: 'High',
    commonTrap: 'Look out for "uncapped" indemnification where your financial liability has no dollar limit.'
  },
  {
    id: 'term-2',
    term: 'Force Majeure',
    latin: 'Superior Force',
    category: 'Contract Execution',
    simpleDefinition: 'An "Act of God" clause that frees both parties from liability if extraordinary unexpected events (like natural disasters, war, or pandemics) prevent fulfilling obligations.',
    realWorldExample: 'If a hurricane destroys your warehouse, a Force Majeure clause protects you from being sued for failing to deliver goods on schedule.',
    riskLevel: 'Low',
    commonTrap: 'Check whether financial hardship or economic inflation counts as Force Majeure (usually it does not).'
  },
  {
    id: 'term-3',
    term: 'Liquidated Damages',
    latin: 'Pre-determined compensation',
    category: 'Penalties',
    simpleDefinition: 'A fixed penalty fee agreed upon in advance that must be paid if a specific part of the contract is broken.',
    realWorldExample: 'If a construction project is delayed past July 1st, the builder pays $500 for every day late as liquidated damages.',
    riskLevel: 'High',
    commonTrap: 'Unfairly exorbitant amounts designed as punitive fines rather than actual loss compensation.'
  },
  {
    id: 'term-4',
    term: 'Work Made for Hire',
    latin: 'Exclusio Auctoris',
    category: 'Intellectual Property',
    simpleDefinition: 'A legal doctrine where the person paying for work is legally recognized as the original creator and author of the work, not the contractor who built it.',
    realWorldExample: 'If you code an app under a Work for Hire agreement, you cannot re-use that code for your own future projects without permission.',
    riskLevel: 'Medium',
    commonTrap: 'Ensure this clause only activates AFTER full payment has been received!'
  },
  {
    id: 'term-5',
    term: 'Severability',
    latin: 'Salvatorius',
    category: 'Contract Structure',
    simpleDefinition: 'If a judge declares one paragraph of a contract illegal or invalid, the rest of the contract stays active and legally enforceable.',
    realWorldExample: 'If an illegal 5-year non-compete clause is thrown out by court, the rest of the employment contract (like confidentiality) remains enforced.',
    riskLevel: 'Low',
    commonTrap: 'Standard boiler-plate clause, safe and recommended.'
  },
  {
    id: 'term-6',
    term: 'Subrogation',
    latin: 'Subrogare (substitute)',
    category: 'Insurance & Claims',
    simpleDefinition: 'The right for an insurance company to step into your shoes and sue the party that caused your damage after paying your claim.',
    realWorldExample: 'If someone breaks your car window and your insurance company pays for repair, the insurer can subrogate and sue the culprit to get their money back.',
    riskLevel: 'Medium',
    commonTrap: 'Check for "Waiver of Subrogation" clauses in commercial leases.'
  },
  {
    id: 'term-7',
    term: 'Injunctive Relief',
    latin: 'Injunction',
    category: 'Dispute Resolution',
    simpleDefinition: 'A court order forcing someone to immediately stop doing something (like leaking secrets or using a trademark) right now.',
    realWorldExample: 'A court issuing an injunction ordering a former employee to stop launching a competing product using stolen source code.',
    riskLevel: 'High',
    commonTrap: 'Clauses that waive your right to require the other party to post a cash bond before stopping your business.'
  },
  {
    id: 'term-8',
    term: 'Jurisdiction & Governing Law',
    latin: 'Lex Loci',
    category: 'Legal Venue',
    simpleDefinition: 'Specifies which state/country court system and laws will judge any lawsuit arising from the contract.',
    realWorldExample: 'If you live in New York but sign a contract specifying Delaware governing law, any litigation must take place in Delaware courts.',
    riskLevel: 'Medium',
    commonTrap: 'Signing agreements that mandate resolving disputes in far-away overseas jurisdictions with high travel costs.'
  },
  {
    id: 'term-9',
    term: 'Arbitration Clause',
    latin: 'Arbitrium',
    category: 'Dispute Resolution',
    simpleDefinition: 'Agreement to resolve legal disputes out of court with a private arbitrator instead of a public judge and jury.',
    realWorldExample: 'Instead of suing in court, both parties present evidence to a hired legal arbitrator whose decision is final.',
    riskLevel: 'Medium',
    commonTrap: 'Binding arbitration often waives your right to join class-action lawsuits or appeal bad decisions.'
  },
  {
    id: 'term-10',
    term: 'Non-Solicitation',
    latin: 'Prohibito',
    category: 'Employment & Service',
    simpleDefinition: 'A clause preventing you from hiring employees away from a client or poaching their clients for a set timeframe.',
    realWorldExample: 'After leaving an agency, you cannot hire away their lead designer for 12 months.',
    riskLevel: 'Medium',
    commonTrap: 'Excessively long restriction periods (over 2 years) or broad definitions of contacts.'
  }
];
