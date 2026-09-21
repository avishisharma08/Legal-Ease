export const CITIZEN_RIGHTS_CATEGORIES = [
  { id: 'all', label: 'All Rights & Topics' },
  { id: 'tenant', label: '🏠 Tenant & Rental Rights' },
  { id: 'consumer', label: '🛒 Consumer & E-Commerce Rights' },
  { id: 'employee', label: '💼 Employee & Freelancer Rights' },
  { id: 'cyber', label: '🛡️ Cyber & Banking Fraud' }
];

export const CITIZEN_RIGHTS_GUIDES = [
  {
    id: 'tenant-deposit',
    category: 'tenant',
    title: 'Landlord Withholding Security Deposit',
    summary: 'Protection against unfair deductions and delay in returning security deposits upon vacating.',
    applicableLaw: 'Model Tenancy Act (MTA) 2021 & State Rent Control Acts',
    keyRights: [
      'Statutory Deposit Limit: Residential security deposit capped at maximum 2 months rent under Model Tenancy Act.',
      'Mandatory Refund Timeline: Deposit must be refunded within 30 days of handing over peaceful vacant possession.',
      'Itemized Deduction Proof: Landlord cannot deduct arbitrarily; must provide invoices/receipts for actual tenant-caused damage beyond normal wear and tear.',
      'Interest on Delay: Arbitrary withholding attracts legal notice and claims with interest before the Rent Court/Rent Tribunal.'
    ],
    actionSteps: [
      'Document the vacated property with high-resolution photos and video on handover date.',
      'Send a formal handover email/letter requesting return of deposit with your bank account details.',
      'If withheld past 15 days without receipts, issue a formal Legal Demand Notice (using the template below).',
      'File a complaint before the local Rent Authority / Rent Court if unpaid within 15 days of notice.'
    ],
    sampleNotice: {
      subject: 'LEGAL DEMAND NOTICE: Unconditional Refund of Security Deposit for Premises',
      body: `To,
[Landlord Name]
[Landlord Address / Phone]

Dear Sir/Madam,

RE: DEMAND FOR REFUND OF SECURITY DEPOSIT AMOUNTING TO RS. [Amount] IN RESPECT OF PREMISES LOCATED AT [Full Rented Address].

1. I was the lawful tenant at the aforementioned premises pursuant to the Rental Agreement dated [Agreement Date], which lawfully concluded on [Vacating Date].
2. Peaceful and vacant possession was duly delivered to you on [Vacating Date], and the property was inspected with no dues pending on my part.
3. As per the terms of our Agreement and governing tenancy law, the interest-free security deposit of Rs. [Amount] was to be refunded upon handover.
4. Despite repeated requests and reminders, you have failed to remit the refund without any lawful basis or itemized breakdown of legitimate damages.

I hereby formally call upon you to refund the full security deposit of Rs. [Amount] into my bank account within SEVEN (7) DAYS of receipt of this notice, failing which I shall be constrained to initiate legal proceedings before the competent Rent Authority / Civil Court for recovery along with 18% p.a. penal interest, holding you fully liable for all litigation costs.

Bank Details for Remittance:
A/C Holder: [Your Full Name]
Bank & Branch: [Bank Name]
A/C Number: [Account No]
IFSC Code: [IFSC Code]

Yours sincerely,
[Your Name]
Date: [Today Date]`
    }
  },
  {
    id: 'tenant-eviction',
    category: 'tenant',
    title: 'Illegal Eviction & Utility Disconnection',
    summary: 'Rights against sudden eviction, forceful lockouts, or cutting off electricity/water supplies.',
    applicableLaw: 'Section 20 & 21, Model Tenancy Act 2021',
    keyRights: [
      'Mandatory Notice Period: Landlords cannot force eviction without serving written statutory notice (typically 1 to 2 months as per agreement).',
      'Essential Services Protection: Section 20 strictly prohibits landlords from cutting off or withholding essential supplies (water, electricity, access) under any circumstances.',
      'Compensatory Damages: If a landlord unlawfully withholds essential supplies, the Rent Authority can levy a heavy penalty and order immediate restoration.'
    ],
    actionSteps: [
      'Call local police helpline (112) immediately if there is threat of physical lockout or harassment.',
      'File an urgent application before the local Rent Tribunal/Sub-Divisional Magistrate (SDM) for restoration of utilities.',
      'Keep copies of the rental agreement and recent rent payment receipts safely accessible.'
    ],
    sampleNotice: {
      subject: 'URGENT NOTICE: Cease Unlawful Disconnection of Essential Utilities / Attempted Illegal Eviction',
      body: `To,
[Landlord Name]

RE: UNLAWFUL ATTEMPT AT EVICTION AND THREAT OF UTILITY DISCONNECTION AT [Address].

Please take notice that you are in direct violation of the Rental Agreement dated [Date] and Section 20 of the Model Tenancy Act. You have no legal authority to forcefully evict, enter the premises without notice, or interfere with essential amenities (electricity/water). 

Take notice that any further harassment or disconnection of utilities will compel me to immediately approach the Police and Rent Tribunal for injunctive relief and criminal trespass proceedings at your sole risk and consequence.

[Your Name]
Date: [Today Date]`
    }
  },
  {
    id: 'consumer-defective',
    category: 'consumer',
    title: 'Defective Product & E-Commerce Return Denial',
    summary: 'Remedies for damaged goods, refusal of replacement/refund, and deceptive cancellation policies.',
    applicableLaw: 'Consumer Protection Act, 2019 (Sections 2(47), 35 & E-Commerce Rules 2020)',
    keyRights: [
      'Right to Product Replacement / Full Refund: If a delivered product is damaged, counterfeit, or differs significantly from description, merchant cannot enforce arbitrary "No Refund" disclaimers.',
      'Protection Against Dark Patterns: E-commerce platforms cannot misrepresent return windows or charge unjustified cancellation fees.',
      'Product Liability: Manufacturers and sellers are strictly liable for compensation if a defective product causes harm or loss.',
      'E-Daakhil Online Filing: Consumers can file complaints online without hiring a lawyer from the comfort of their home.'
    ],
    actionSteps: [
      'Capture unboxing photos/videos and preserve original invoice and packaging.',
      'Lodge a formal grievance ticket on the seller/platform support portal.',
      'Call the National Consumer Helpline at 1915 or register grievance on consumerhelpline.gov.in.',
      'If unresolved, serve a formal Consumer Legal Notice and proceed to file on e-Daakhil (edaakhil.nic.in).'
    ],
    sampleNotice: {
      subject: 'LEGAL NOTICE: Deficiency of Service & Unfair Trade Practice regarding Order #[Order Number]',
      body: `To,
Customer Grievance Officer,
[Company / Brand Name]
[Address / Email]

RE: NOTICE UNDER CONSUMER PROTECTION ACT, 2019 FOR DEFECTIVE PRODUCT / REFUSAL OF REFUND FOR ORDER #[Order Number].

1. On [Purchase Date], I purchased [Product Name] for Rs. [Amount Paid] vide Invoice #[Invoice No].
2. Upon delivery, the product was found to be [defective / damaged / completely different from product description].
3. Despite raising Complaint Ticket #[Ticket No] within the stipulated window, your team arbitrarily refused resolution / replacement / refund, constituting "Deficiency of Service" and "Unfair Trade Practice" under Section 2(47) of the Consumer Protection Act, 2019.

I hereby demand that you process a full refund of Rs. [Amount Paid] or deliver a brand-new replacement within SEVEN (7) DAYS of this notice. In default, I shall file a formal complaint before the District Consumer Disputes Redressal Commission via e-Daakhil, claiming the refund amount along with Rs. 25,000 for mental harassment and litigation expenses.

Yours faithfully,
[Your Name]
Phone: [Phone Number]
Date: [Today Date]`
    }
  },
  {
    id: 'employee-salary',
    category: 'employee',
    title: 'Unpaid Wages, Full & Final (F&F) Settlement Delay',
    summary: 'Rights when employers or clients delay salary disbursement, withhold relieving letters, or delay F&F.',
    applicableLaw: 'Payment of Wages Act 1936, Industrial Disputes Act 1947 & State Shops and Establishments Acts',
    keyRights: [
      'Statutory Settlement Window: Full & Final settlement must be released within 7 to 30 days of the last working day as per employment terms.',
      'Right to Relieving & Experience Letter: Employer cannot arbitrarily withhold service/relieving certificates as leverage for disputed claims.',
      'Gratuity Entitlement: Employees completing 5 continuous years of service are entitled to statutory gratuity under the Payment of Gratuity Act, 1972, irrespective of resignation.',
      'Labor Commissioner Redressal: Non-payment of earned wages can be directly reported to the local Labor Commissioner office.'
    ],
    actionSteps: [
      'Ensure written resignation confirmation and approved handover documentation are saved.',
      'Send a formal follow-up email to HR and Finance detailing exact pending salary, bonus, leave encashment, and PF.',
      'Issue a formal Notice of Demand for Unpaid Wages.',
      'Submit a formal complaint with the State Labor Commissioner or online SAMADHAN portal.'
    ],
    sampleNotice: {
      subject: 'LEGAL NOTICE: Demand for Immediate Release of Full & Final Dues and Relieving Letter',
      body: `To,
The Management / Human Resources,
[Company Name]
[Company Address]

RE: NON-PAYMENT OF FULL & FINAL SETTLEMENT FOR EMPLOYEE ID #[Employee ID].

1. I served as [Designation] at [Company Name] until my last working day on [LWD Date], having duly completed all project transitions and asset handovers.
2. Under the employment contract and applicable labor laws, all outstanding dues (Rs. [Amount]) including earned salary, leave encashment, and relieving documentation were payable within 30 days of separation.
3. As of date, despite lapse of [Number] weeks, the said dues remain willfully unpaid without justifiable cause.

Take notice that you are required to remit Rs. [Amount] into my bank account and issue my Relieving Letter within SEVEN (7) DAYS from receipt of this communication. Failing this, I shall proceed to lodge a formal complaint with the Labor Commissioner and initiate recovery proceedings under the Payment of Wages Act with interest and damages.

[Your Full Name]
Date: [Today Date]`
    }
  },
  {
    id: 'cyber-fraud',
    category: 'cyber',
    title: 'Unauthorized UPI / Credit Card & Banking Scams',
    summary: 'Immediate critical steps and RBI guidelines to recover money lost in online scams and phishing.',
    applicableLaw: 'RBI Circular on Limiting Customer Liability (2017) & Information Technology Act 2000',
    keyRights: [
      'Zero Customer Liability (Golden 3-Day Rule): If an unauthorized fraud is reported to your bank within 3 calendar days of occurrence, the customer carries ZERO financial liability under RBI guidelines.',
      'National Cybercrime Helpline 1930: Calling 1930 immediately allows the cyber police to freeze the beneficiary fraud account before scammers withdraw cash.',
      'Time-Bound Bank Resolution: Bank must credit the disputed amount as shadow reversal within 10 working days of complaint.',
      'Banking Ombudsman Redressal: If the bank does not resolve the complaint within 30 days, customers can approach the RBI Ombudsman.'
    ],
    actionSteps: [
      'IMMEDIATELY call 1930 (National Cybercrime Reporting Helpline) within 1-2 hours of the fraudulent transaction to freeze the fund transfer.',
      'Block the compromised debit/credit card, UPI IDs, and internet banking credentials immediately via bank helpline.',
      'File an online complaint with transaction screenshots at cybercrime.gov.in and obtain an acknowledgement number.',
      'Submit the cyber police acknowledgement copy and formal dispute letter to your home bank branch within 72 hours.'
    ],
    sampleNotice: {
      subject: 'FORMAL DISPUTE LETTER: Immediate Reversal of Unauthorized Financial Fraud Transaction',
      body: `To,
The Branch Manager / Nodal Officer,
[Bank Name], [Branch Address]

RE: DISPUTE OF UNAUTHORIZED TRANSACTION OF RS. [Amount] FROM ACCOUNT #[Account Number].

Dear Sir/Madam,

1. I am an account holder holding Savings A/C #[Account Number].
2. On [Date & Time], an unauthorized fraudulent transaction of Rs. [Amount] occurred via [UPI / NetBanking / Card] without my consent (Transaction ID: [Transaction ID/UTR]).
3. I have immediately blocked the card/channel and reported the incident to the National Cybercrime Portal (Complaint Ack #[Cybercrime Ack Number]).
4. Under RBI Master Circular DBR.No.Leg.BC.78/09.07.005/2017-18, reporting within 3 days mandates Zero Customer Liability.

I request you to immediately reverse and credit the disputed sum of Rs. [Amount] into my account and initiate chargeback with the beneficiary bank.

Attached:
1. Cybercrime complaint copy
2. Bank statement showing unauthorized debit

Yours faithfully,
[Your Name]
Phone: [Phone Number]
Date: [Today Date]`
    }
  }
];
