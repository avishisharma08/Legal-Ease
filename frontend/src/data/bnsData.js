/**
 * Bharatiya Nyaya Sanhita (BNS) 2023 Crosswalk & Criminal Law Dataset
 * Effective Date in India: 1 July 2024
 * Replaces: Indian Penal Code (IPC) 1860, Code of Criminal Procedure (CrPC) 1973, Indian Evidence Act 1872
 */

export const BNS_CATEGORIES = [
  { id: 'all', label: 'All Sections' },
  { id: 'fraud', label: '💳 Cheating & Financial Crimes' },
  { id: 'property', label: '🏠 Theft & Property Crimes' },
  { id: 'offenses', label: '⚖️ Bodily Offenses & Assault' },
  { id: 'women', label: '🛡️ Crimes Against Women & Children' },
  { id: 'cyber', label: '💻 Cyber & Electronic Defamation' },
  { id: 'state', label: '🏛️ Public Order & State Sovereignty' }
];

export const BNSS_PROCEDURAL_REFORMS = [
  {
    title: 'Zero FIR Across Any Police Station',
    statute: 'Section 173(1), BNSS 2023',
    description: 'A citizen can lodge an FIR at any police station irrespective of territorial jurisdiction. The station must register it and transfer to competent station within 24 hours.'
  },
  {
    title: 'Mandatory Videography of Crime Scenes & Searches',
    statute: 'Section 105, BNSS 2023',
    description: 'Police must conduct audio-video recording of search and seizure operations, including seizure of phones, laptops, and physical assets, ensuring chain of custody.'
  },
  {
    title: 'Electronic / Digital Evidence Formal Recognition',
    statute: 'Section 61, Bharatiya Sakshya Adhiniyam (BSA) 2023',
    description: 'Electronic records, WhatsApp chats, server logs, and digital signatures have the same legal standing as original physical paper documents.'
  },
  {
    title: 'Community Service for Petty Crimes',
    statute: 'Section 23 & 356, BNS 2023',
    description: 'First-time petty offenders (e.g. defamation, theft under ₹5,000 upon return of goods) can be sentenced to community service rather than mandatory imprisonment.'
  },
  {
    title: 'Mandatory Timeline for Framing Charges',
    statute: 'Section 251(1), BNSS 2023',
    description: 'Courts are required to frame charges within 60 days from the first date of hearing, accelerating trial timelines for citizens.'
  }
];

export const BNS_SECTIONS = [
  {
    id: 'cheating-420',
    category: 'fraud',
    oldIpc: 'Section 420',
    newBns: 'Section 318(4)',
    offense: 'Cheating and dishonestly inducing delivery of property',
    description: 'Fraudulent deception inducing any person to deliver property, alter documents, or make valuable security.',
    punishment: 'Imprisonment up to 7 years and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Consolidated under Section 318 with clear distinction between simple cheating (Section 318(2)) and aggravated cheating with property inducement.'
  },
  {
    id: 'criminal-breach-trust-406',
    category: 'fraud',
    oldIpc: 'Section 406',
    newBns: 'Section 316',
    offense: 'Criminal Breach of Trust (Misappropriation)',
    description: 'Dishonestly misappropriating or converting entrusted property, money, or assets for personal use.',
    punishment: 'Imprisonment up to 5 years (previously 3 years) and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Punishment increased from 3 years to 5 years under BNS 2023 for greater deterrence.'
  },
  {
    id: 'forgery-468',
    category: 'fraud',
    oldIpc: 'Section 468',
    newBns: 'Section 338',
    offense: 'Forgery for purpose of cheating',
    description: 'Creating false documents, digital signatures, or electronic records with intent to cheat or defraud.',
    punishment: 'Imprisonment up to 7 years and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Explicitly covers digital electronic documents, altered PDFs, and forged digital signatures under Bharatiya Sakshya Adhiniyam.'
  },
  {
    id: 'theft-379',
    category: 'property',
    oldIpc: 'Section 379',
    newBns: 'Section 303(2)',
    offense: 'Theft / Stealing of Movable Property',
    description: 'Dishonestly moving any movable property out of the possession of any person without consent.',
    punishment: 'Imprisonment up to 3 years, or fine, or both (Community service if stolen property value is under ₹5,000)',
    bailable: 'Bailable / Non-Bailable based on severity',
    cognizable: 'Cognizable',
    bnsChange: 'Introduced historic reform: If stolen value is under ₹5,000 and the first-time offender restores the property, community service may be ordered.'
  },
  {
    id: 'extortion-384',
    category: 'property',
    oldIpc: 'Section 384',
    newBns: 'Section 308',
    offense: 'Extortion (Blackmail / Coercion)',
    description: 'Intentionally putting any person in fear of injury and thereby dishonestly inducing delivery of property.',
    punishment: 'Imprisonment up to 7 years (previously 3 years) and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Maximum prison term increased from 3 years to 7 years under BNS 2023.'
  },
  {
    id: 'criminal-trespass-441',
    category: 'property',
    oldIpc: 'Section 441 & 447',
    newBns: 'Section 329',
    offense: 'Criminal Trespass & House Trespass',
    description: 'Entering upon property in possession of another with intent to commit an offense, intimidate, or unlawfully remain.',
    punishment: 'Imprisonment up to 3 months or fine up to ₹5,000 (increased from ₹500)',
    bailable: 'Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Fines modernized from antiquated ₹500 IPC levels to realistic ₹5,000 penalties.'
  },
  {
    id: 'defamation-499',
    category: 'cyber',
    oldIpc: 'Section 499 & 500',
    newBns: 'Section 356',
    offense: 'Defamation (Libel, Slander & Online Trolling)',
    description: 'Making or publishing false imputations intending to harm the reputation of any person.',
    punishment: 'Simple imprisonment up to 2 years, or fine, or both, or Community Service',
    bailable: 'Bailable',
    cognizable: 'Non-Cognizable',
    bnsChange: 'Added modern alternative: Community Service can be ordered in lieu of prison time for first-time defamation.'
  },
  {
    id: 'criminal-intimidation-506',
    category: 'offenses',
    oldIpc: 'Section 506',
    newBns: 'Section 351',
    offense: 'Criminal Intimidation (Threats to Life / Property)',
    description: 'Threatening another with injury to their person, reputation, or property to compel action.',
    punishment: 'Imprisonment up to 2 years, or up to 7 years if threat is to cause death or grievous hurt',
    bailable: 'Bailable / Non-Bailable if aggravated',
    cognizable: 'Non-Cognizable / Cognizable if aggravated',
    bnsChange: 'Streamlined section with modern electronic threat / cyber intimidation coverage.'
  },
  {
    id: 'murder-302',
    category: 'offenses',
    oldIpc: 'Section 302',
    newBns: 'Section 103(1)',
    offense: 'Punishment for Murder',
    description: 'Culpable homicide committed with premeditated intent or knowledge of causing death.',
    punishment: 'Death penalty or Imprisonment for life, and liable to fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Section 103(2) newly criminalizes mob lynching or murder committed by 5 or more persons based on race, caste, community, or place of birth with capital punishment.'
  },
  {
    id: 'culpable-homicide-304',
    category: 'offenses',
    oldIpc: 'Section 304',
    newBns: 'Section 105',
    offense: 'Culpable Homicide not amounting to Murder',
    description: 'Causing death with intention or knowledge, but under circumstances of sudden provocation or exception.',
    punishment: 'Imprisonment for life or up to 10 years, and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Re-sequenced into Part II of Chapter VI under BNS.'
  },
  {
    id: 'rash-driving-hit-and-run-304a',
    category: 'offenses',
    oldIpc: 'Section 304A',
    newBns: 'Section 106',
    offense: 'Causing Death by Negligence & Hit-and-Run',
    description: 'Causing death by rash or negligent act not amounting to culpable homicide.',
    punishment: 'Section 106(1): Up to 5 years; Section 106(2): Up to 10 years and fine if driver flees scene without reporting to police',
    bailable: 'Non-Bailable (for hit-and-run without reporting)',
    cognizable: 'Cognizable',
    bnsChange: 'Stringent hit-and-run clause (Section 106(2)) increases penalty to 10 years if the driver escapes without reporting to nearest police officer or magistrate.'
  },
  {
    id: 'assault-modesty-354',
    category: 'women',
    oldIpc: 'Section 354',
    newBns: 'Section 74',
    offense: 'Assault or Criminal Force to Woman with Intent to Outrage Modesty',
    description: 'Assaulting or using criminal force against any woman intending to outrage her modesty.',
    punishment: 'Imprisonment not less than 1 year, extendable to 5 years, and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Grouped under specialized Chapter V (Offenses against Woman and Child) in BNS 2023.'
  },
  {
    id: 'stalking-354d',
    category: 'women',
    oldIpc: 'Section 354D',
    newBns: 'Section 78',
    offense: 'Stalking (Physical & Cyber Monitoring)',
    description: 'Following a woman, contacting repeatedly despite disinterest, or monitoring internet/email/social media usage.',
    punishment: 'Imprisonment up to 3 years (first conviction); up to 5 years for second conviction',
    bailable: 'Bailable (first offense) / Non-Bailable (subsequent)',
    cognizable: 'Cognizable',
    bnsChange: 'Cyber stalking provisions strengthened to include electronic surveillance via tracking apps and social handles.'
  },
  {
    id: 'sexual-harassment-354a',
    category: 'women',
    oldIpc: 'Section 354A',
    newBns: 'Section 75',
    offense: 'Sexual Harassment & Unwelcome Advances',
    description: 'Physical contact, demand for sexual favors, showing pornography against will, or sexually colored remarks.',
    punishment: 'Rigorous imprisonment up to 3 years, or fine, or both',
    bailable: 'Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Consolidated under Chapter V of BNS 2023.'
  },
  {
    id: 'deceitful-marriage-promising-69',
    category: 'women',
    oldIpc: 'No direct IPC section (covered under 417/376)',
    newBns: 'Section 69',
    offense: 'Sexual Intercourse on Deceitful Promise of Marriage / Employment',
    description: 'Employing deceitful means, false promise of marriage, fraudulent employment, or false identity to induce sexual relations.',
    punishment: 'Imprisonment up to 10 years and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Brand new statutory section in BNS 2023 specifically addressing deceitful promises of marriage, solving decades of judicial ambiguity.'
  },
  {
    id: 'organized-crime-111',
    category: 'state',
    oldIpc: 'No direct IPC section (State MCOCA/GUJCTOC only)',
    newBns: 'Section 111',
    offense: 'Organized Crime Syndicate Activities',
    description: 'Continuing unlawful activity, extortion, cyber-crimes, land grabbing, contract killing, or human trafficking by crime syndicates.',
    punishment: 'Death penalty or life imprisonment if death results; otherwise minimum 5 years up to life, plus minimum ₹5 Lakh fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'Historic first: Integrated national organized crime legislation into the central criminal penal code.'
  },
  {
    id: 'sedition-repealed-152',
    category: 'state',
    oldIpc: 'Section 124A (Sedition)',
    newBns: 'Section 152',
    offense: 'Acts endangering Sovereignty, Unity and Integrity of India',
    description: 'Exciting secession, armed rebellion, subversive activities, or encouraging separatist feelings.',
    punishment: 'Imprisonment for life or up to 7 years, and fine',
    bailable: 'Non-Bailable',
    cognizable: 'Cognizable',
    bnsChange: 'The colonial word "Sedition" (Rajdroh) was completely repealed. Section 152 strictly penalizes acts endangering national sovereignty and integrity.'
  }
];
