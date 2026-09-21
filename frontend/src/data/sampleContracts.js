export const SAMPLE_CONTRACTS = [
  {
    id: 'sample-freelance',
    title: 'Freelance Design & Development Agreement',
    titleHi: 'फ्रीलांस डिजाइन एवं सॉफ्टवेयर अनुबंध',
    category: 'Independent Work',
    description: 'Contract between a client and an independent software developer/creator in India.',
    overallRisk: 'High',
    riskScore: 78,
    summary: 'Danger: Section 2 forces you to transfer Intellectual Property before payment is received, and Section 5 includes an arbitrary non-solicitation penalty of ₹2,50,000 per violation, which conflicts with Section 27 and 74 of the Indian Contract Act 1872.',
    summaryHi: '⚠️ गंभीर जोखिम: धारा 2 पेमेंट मिलने से पहले ही आपके काम का पूरा कॉपीराइट छीन लेती है, और धारा 5 में ₹2,50,000 का भारी जुर्माना लगाया गया है जो भारतीय अनुबंध अधिनियम की धारा 27 और 74 के तहत शून्य एवं अवैध है।',
    fullText: `INDEPENDENT CONTRACTOR AGREEMENT (INDIA)

This Agreement is executed between Client and Independent Contractor under the laws of India.

1. SERVICES AND COMPENSATION.
Contractor agrees to perform web application design and software engineering services. Client shall pay Contractor ₹1,20,000 upon successful milestone completion within 60 days of invoice receipt.

2. WORK FOR HIRE & INTELLECTUAL PROPERTY.
All materials, code, designs, and deliverables created by Contractor shall be deemed "Work Made for Hire". All title, ownership, copyright, and patent rights immediately vest in Client upon creation, regardless of whether payment has been remitted.

3. WARRANTIES AND REPRESENTATIONS.
Contractor warrants that all code provided is original and does not infringe upon any third-party intellectual property or open-source licenses. Contractor shall personally indemnify Client against any third-party copyright claims with uncapped monetary exposure.

4. TERMINATION FOR CONVENIENCE.
Client may terminate this Agreement at any time without cause upon 24 hours written notice. Upon termination, Contractor must cease all work and Client shall only pay for work accepted prior to notice.

5. NON-SOLICITATION & LIQUIDATED DAMAGES.
Contractor agrees not to solicit or perform services for any client or partner of Client during the term and for two (2) years thereafter. Violation of this clause shall result in liquidated damages of ₹2,50,000 per occurrence.`,
    clauses: [
      {
        id: 'fc1',
        title: 'Payment Terms (Net 60 Days)',
        titleHi: 'भुगतान की शर्तें (60 दिन का विलंब)',
        type: 'Payment',
        risk: 'Medium',
        originalText: 'Client shall pay Contractor ₹1,20,000 upon successful milestone completion within 60 days of invoice receipt.',
        simplifiedText: 'You will have to wait up to 60 days after submitting an invoice to receive your ₹1,20,000 payment.',
        plainHindi: 'बिल (इनवॉइस) देने के बाद आपको अपने ₹1,20,000 पाने के लिए 60 दिनों तक लंबा इंतजार करना पड़ेगा।',
        recommendation: 'Change payment terms from Net 60 to Net 15, and mandate a 30% upfront advance before commencing milestone work.',
        recommendationHi: 'भुगतान की अवधि को 60 दिन से घटाकर 15 दिन कराएं और काम शुरू करने से पहले 30% अग्रिम (एडवांस) मांगें।'
      },
      {
        id: 'fc2',
        title: 'IP Transfer Before Payment Receipt',
        titleHi: 'भुगतान से पहले कॉपीराइट का ट्रांसफर',
        type: 'Intellectual Property',
        risk: 'Critical',
        originalText: 'All title, ownership, copyright... immediately vest in Client upon creation, regardless of whether payment has been remitted.',
        simplifiedText: 'The client legally owns all your code and designs immediately upon creation, even if they default on or refuse your invoice.',
        plainHindi: 'क्लाइंट आपके कोड और डिजाइन का मालिक तुरंत बन जाएगा, चाहे वह आपके बिल का भुगतान करे या मुकर जाए।',
        recommendation: 'Rephrase so Intellectual Property rights transfer ONLY upon full and final payment realization.',
        recommendationHi: 'शर्त बदलवाएं कि बौद्धिक संपदा (IP) का मालिकाना हक केवल पूरा पैसा बैंक में आने के बाद ही ट्रांसफर होगा।'
      },
      {
        id: 'fc3',
        title: '24-Hour Cancellation & Unpaid Work',
        titleHi: '24 घंटे का टर्मिनेशन और अधूरा भुगतान',
        type: 'Termination',
        risk: 'High',
        originalText: 'Client may terminate... upon 24 hours written notice... Client shall only pay for work accepted prior to notice.',
        simplifiedText: 'Client can fire you on 1 day notice and refuse to pay for work you already completed that hasn\'t been formally "accepted" yet.',
        plainHindi: 'क्लाइंट सिर्फ 24 घंटे का नोटिस देकर काम बंद कर सकता है और जो काम उसने अभी "एक्सेप्ट" नहीं किया, उसका पैसा देने से मना कर सकता है।',
        recommendation: 'Demand a minimum 14-day written notice and full prorated compensation for all hours logged up to the termination date.',
        recommendationHi: 'कम से कम 14 दिन का नोटिस और टर्मिनेशन की तारीख तक किए गए पूरे काम का आनुपातिक भुगतान तय कराएं।'
      },
      {
        id: 'fc4',
        title: 'Non-Compete Penalty of ₹2,50,000',
        titleHi: '₹2,50,000 का गैर-कानूनी जुर्माना',
        type: 'Non-Compete',
        risk: 'High',
        originalText: 'Violation of this clause shall result in liquidated damages of ₹2,50,000 per occurrence.',
        simplifiedText: 'Working with any contact of the client for 2 years imposes an arbitrary ₹2,50,000 fine. Under Section 27 of the Indian Contract Act 1872, post-contract non-competes are void.',
        plainHindi: '2 साल तक क्लाइंट के किसी भी साथी के साथ काम करने पर ₹2,50,000 का जुर्माना। भारतीय अनुबंध अधिनियम की धारा 27 के तहत ऐसा प्रतिबंध पूरी तरह शून्य (Void) है।',
        recommendation: 'Delete this clause completely citing Section 27 of Indian Contract Act 1872 (Niranjan Shankar Golikari precedent).',
        recommendationHi: 'भारतीय अनुबंध अधिनियम की धारा 27 का हवाला देकर इस गैर-कानूनी जुर्माने की शर्त को अनुबंध से हटवाएं।'
      }
    ]
  },
  {
    id: 'sample-nda',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    titleHi: 'पारस्परिक गोपनीयता अनुबंध (NDA)',
    category: 'Confidentiality',
    description: 'Standard agreement protecting proprietary secrets between two Indian business entities.',
    overallRisk: 'Medium',
    riskScore: 42,
    summary: 'This agreement protects mutual trade secrets for 3 years under Indian law. However, Section 5 imposes uncapped indemnification that poses unlimited financial liability beyond actual commercial damage.',
    summaryHi: 'यह अनुबंध भारतीय कानून के तहत 3 साल के लिए व्यापारिक गोपनीयता की रक्षा करता है। हालांकि, धारा 5 असीमित हर्जाना थोपती है जो वास्तविक नुकसान से कहीं अधिक असीमित वित्तीय जोखिम पैदा करती है।',
    fullText: `MUTUAL NON-DISCLOSURE AGREEMENT (INDIA)

This Mutual Non-Disclosure Agreement is entered into in New Delhi, India between Disclosing Party and Receiving Party.

1. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" shall include all technical data, trade secrets, financial records, customer lists, software source code, oral disclosures, and notes prepared by either Party, whether or not marked as "Confidential".

2. OBLIGATIONS OF RECEIVING PARTY.
The Receiving Party agrees to maintain Confidential Information in strictest confidence for a period of three (3) years from disclosure. Disclosure to third parties requires prior written consent.

3. EXCLUSIONS FROM CONFIDENTIALITY.
Obligations do not apply to information that: (a) is publicly known without breach; (b) was already in lawful possession prior to disclosure; or (c) is independently developed.

4. INJUNCTIVE RELIEF & JURISDICTION.
Disclosing Party shall be entitled to seek immediate injunctive relief before courts of competent jurisdiction without the necessity of proving actual monetary damages.

5. INDEMNIFICATION & LIABILITY.
Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party against any and all claims, losses, liabilities, costs, damages, and attorney's fees arising out of any unauthorized disclosure without monetary cap.`,
    clauses: [
      {
        id: 'c1',
        title: 'Broad Definition of Confidential Information',
        titleHi: 'गोपनीय जानकारी का अत्यधिक व्यापक दायरा',
        type: 'Scope',
        risk: 'Medium',
        originalText: '"Confidential Information" shall include all information... whether or not marked as "Confidential".',
        simplifiedText: 'Anything communicated between parties counts as secret, even if nobody labeled or stamped it confidential.',
        plainHindi: 'दोनों पक्षों के बीच हुई हर बातचीत गोपनीय मानी जाएगी, भले ही उसे गोपनीय मार्क न किया गया हो।',
        recommendation: 'Negotiate that oral disclosures must be confirmed in writing within 14 days to be legally protected.',
        recommendationHi: 'शर्त रखें कि मौखिक बातचीत को 14 दिनों के भीतर लिखित में पुष्टि करने पर ही गोपनीय माना जाएगा।'
      },
      {
        id: 'c2',
        title: 'Uncapped Indemnification Liability',
        titleHi: 'असीमित हर्जाना देयता',
        type: 'Liability',
        risk: 'Critical',
        originalText: 'Receiving Party agrees to indemnify... against any and all claims, losses, liabilities, costs... without monetary cap.',
        simplifiedText: 'If information is accidentally disclosed, you could be forced to pay unlimited financial damages without any ceiling.',
        plainHindi: 'यदि गलती से भी कोई जानकारी लीक होती है, तो बिना किसी अधिकतम सीमा के आपको करोड़ों का असीमित हर्जाना भरना पड़ सकता है।',
        recommendation: 'Cap total indemnification liability to a reasonable limit (e.g. ₹5,00,000 or total contract value) under Section 73 of Indian Contract Act.',
        recommendationHi: 'भारतीय अनुबंध अधिनियम की धारा 73 के तहत हर्जाने की अधिकतम सीमा तय कराएं (जैसे ₹5,00,000 या अनुबंध का कुल मूल्य)।'
      }
    ]
  },
  {
    id: 'sample-tenancy',
    title: 'Residential Tenancy & Lease Deed',
    titleHi: 'आवासीय किरायानामा (मॉडल टेनेंसी एक्ट 2021)',
    category: 'Tenancy & Real Estate',
    description: 'Residential lease deed between landlord and tenant under the Model Tenancy Act 2021.',
    overallRisk: 'High',
    riskScore: 72,
    summary: 'Red Flag: Section 4 demands a 10-month security deposit of ₹2,50,000 and allows arbitrary forfeiture without Rent Authority inspection, violating Model Tenancy Act 2021 caps.',
    summaryHi: '⚠️ रेड फ्लैग: धारा 4 में 10 महीने का ₹2,50,000 भारी सिक्योरिटी डिपॉजिट मांगा गया है और मकान मालिक को मनमाने ढंग से पैसा जब्त करने की छूट दी गई है, जो मॉडल टेनेंसी एक्ट 2021 (अधिकतम 2 महीने की सीमा) का खुला उल्लंघन है।',
    fullText: `RESIDENTIAL LEASE AGREEMENT (INDIA)

This Lease Agreement is made between Landlord and Tenant for Premise No. 402, Bengaluru, Karnataka.

1. TERM AND MONTHLY RENT.
The lease shall be for an initial period of 11 months. Tenant agrees to pay monthly rent of ₹25,000 in advance on or before the 5th of each English calendar month.

2. SECURITY DEPOSIT AND FORFEITURE.
Tenant shall pay an interest-free Security Deposit of ₹2,50,000 (10 months rent) upon signing. Landlord retains absolute discretion to deduct any repair, painting, or administrative costs upon vacation without providing bills.

3. ARBITRARY RENT ESCALATION.
Landlord reserves the right to increase rent by 15% at any time during the tenancy with 7 days verbal notice.

4. ENTRY AND INSPECTION.
Landlord or their agents may enter the leased premises at any hour of the day or night without prior notice for general inspection.`,
    clauses: [
      {
        id: 'tc1',
        title: 'Excessive Security Deposit (10 Months)',
        titleHi: 'अत्यधिक सिक्योरिटी डिपॉजिट (10 महीने का किराया)',
        type: 'Deposit',
        risk: 'Critical',
        originalText: 'Tenant shall pay an interest-free Security Deposit of ₹2,50,000 (10 months rent)... Landlord retains absolute discretion to deduct...',
        simplifiedText: 'You are forced to deposit ₹2,50,000 upfront, and the landlord can withhold money without showing repair receipts.',
        plainHindi: 'आपसे ₹2,50,000 (10 महीने का किराया) अग्रिम मांगा जा रहा है और मकान मालिक बिना बिल दिखाए कटौती करने का एकतरफा अधिकार रख रहा है।',
        recommendation: 'Under Section 20 of the Model Tenancy Act 2021, residential security deposit cannot exceed two (2) months rent (₹50,000).',
        recommendationHi: 'मॉडल टेनेंसी एक्ट 2021 की धारा 20 के तहत आवासीय घर के लिए 2 महीने से अधिक (यानी अधिकतम ₹50,000) डिपॉजिट नहीं लिया जा सकता।'
      },
      {
        id: 'tc2',
        title: 'Unannounced Entry at Any Hour',
        titleHi: 'बिना पूर्व सूचना कभी भी घर में प्रवेश',
        type: 'Privacy',
        risk: 'High',
        originalText: 'Landlord or their agents may enter the leased premises at any hour of the day or night without prior notice...',
        simplifiedText: 'The landlord claims the right to barge into your home without warning at any hour, violating your statutory right to privacy.',
        plainHindi: 'मकान मालिक बिना किसी पूर्व सूचना के दिन या रात में कभी भी घर में घुसने का अधिकार मांग रहा है, जो निजता का हनन है।',
        recommendation: 'Mandate minimum 24-hour written notice prior to entry between 9:00 AM and 6:00 PM only, as codified under Model Tenancy Act.',
        recommendationHi: 'शर्त तय करें कि केवल सुबह 9 से शाम 6 बजे के बीच और 24 घंटे पहले लिखित सूचना देने पर ही मकान मालिक आ सकता है।'
      }
    ]
  },
  {
    id: 'sample-saas',
    title: 'SaaS Software Terms of Service',
    titleHi: 'क्लाउड सॉफ्टवेयर सेवा शर्तें',
    category: 'Software & Technology',
    description: 'Standard enterprise cloud software terms under Indian Information Technology Act 2000.',
    overallRisk: 'Low',
    riskScore: 24,
    summary: 'Balanced commercial terms. Includes 99.9% uptime SLA, liability capped at annual subscription fees paid, and 30-day notice for auto-renewal.',
    summaryHi: 'संतुलित और उचित शर्तें। 99.9% अपटाइम गारंटी, पिछले 1 वर्ष में भुगतान किए गए शुल्क तक सीमित देयता, और ऑटो-रिन्यूअल से 30 दिन पहले नोटिस की सुविधा।',
    fullText: `TERMS OF SERVICE - CLOUD PLATFORM (INDIA)

1. SUBSCRIPTION GRANT.
Company grants Subscriber a non-exclusive right to access and use the Cloud Service within India.

2. SERVICE LEVEL AGREEMENT (SLA).
Company guarantees 99.9% monthly uptime. If downtime exceeds 0.1%, Subscriber is entitled to a prorated service credit equal to 10% of monthly subscription fees.

3. LIMITATION OF LIABILITY.
Total cumulative liability of either party is capped at total fees paid by Subscriber in the preceding twelve (12) months.

4. DISPUTE RESOLUTION & ARBITRATION.
Any dispute shall be referred to arbitration in New Delhi under the Arbitration and Conciliation Act, 1996.`,
    clauses: [
      {
        id: 'sc1',
        title: 'Uptime Guarantee (99.9% SLA)',
        titleHi: 'अपटाइम गारंटी (99.9% सेवा स्तर)',
        type: 'Performance',
        risk: 'Low',
        originalText: 'Company guarantees 99.9% monthly uptime... entitled to a prorated service credit equal to 10%...',
        simplifiedText: 'If the cloud service goes down for more than 43 minutes in a calendar month, you receive a 10% credit discount.',
        plainHindi: 'यदि महीने में सेवा 43 मिनट से अधिक बंद रहती है, तो आपको 10% का बिल क्रेडिट मिलेगा।',
        recommendation: 'Standard, fair industry SLA.'
      },
      {
        id: 'sc2',
        title: 'Liability Capped to 12 Months Fees',
        titleHi: 'देयता पिछले 12 महीने की फीस तक सीमित',
        type: 'Liability',
        risk: 'Low',
        originalText: 'Total cumulative liability of either party is capped at total fees paid... in preceding twelve (12) months.',
        simplifiedText: 'Maximum recovery in a legal dispute is capped at the annual subscription value paid.',
        plainHindi: 'किसी भी कानूनी विवाद में अधिकतम देयता पिछले 1 वर्ष में चुकाई गई राशि तक ही सीमित रहेगी।',
        recommendation: 'Balanced mutual limitation of liability.'
      }
    ]
  }
];
