/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here
  'company-name': 'Acme Inc',
  'company-number': '01234567',
  'company-type': 'Private Limited Company',
  'company-sector': 'Hairdressing and other beauty treatments', // nature of business
  'company-address': '10 Whitechapel High St, London E1 8QS',
  'company-address-street': '10 Whitechapel High St',
  'company-address-city': 'London',
  'company-address-postcode': 'E1 8QS',
  'company-borough': 'London Borough of Tower Hamlets',
  'officer-name': 'Sarah Philips',
  'officer-dob-month': '3',
  'officer-dob-year': '1987',
  'officer-address-street': '72 Guild Street',
  'officer-address-city': 'London',
  'officer-address-postcode': 'SE23 6FH',
  // 'officer-phone': '07700 900457',
  // 'officer-email': 'sarah.phillips@example.com',
  'not-relevant': [],
  completed: ['10'],
  sections: [
    {
      title: 'Business tax',
      reasons: [
        {
          text: 'Your business is registered as: ',
          data: 'company-type'
        },
        {
          text: 'Your said your business will make more than £85,000 in a 12 month period',
          attribute: 'vat',
          value: 'yes'
        }
      ],
      results: [
        {
          id: '10',
          title: 'Register your company',
          href: 'https://www.gov.uk/limited-company-formation/register-your-company',
          body: 'You’ll get a ‘certificate of incorporation’. This confirms the company legally exists and shows the company number and date of formation.'
        },
        {
          id: '11',
          title: 'Register for Corporation Tax',
          href: 'https://www.gov.uk/limited-company-formation/set-up-your-company-for-corporation-tax',
          body: 'Register within 3 months of starting to do business. This includes buying, selling, advertising, renting a property and employing someone.'
        },
        {
          id: '12',
          title: 'VAT registration',
          href: 'https://www.gov.uk/vat-registration',
          body: 'You must register your business for VAT with HM Revenue and Customs (HMRC) if its VAT taxable turnover is more than £85,000.',
          attribute: 'vat',
          value: 'yes'
        }
      ]
    },
    {
      title: 'Business finance and support',
      reasons: [
        {
          text: 'Your said your business stores or uses personal information',
          attribute: 'intent',
          value: 'data-protection'
        },
        {
          text: 'Your said your business sells goods online',
          attribute: 'intent',
          value: 'sell-online'
        }
      ],
      results: [
        {
          id: '20',
          title: 'Apply for a Start Up Loan for your business',
          href: 'https://www.gov.uk/apply-start-up-loan',
          body: 'Loans and mentoring for people looking to start or grow a business in England, Scotland, Wales and Northern Ireland.',
          attribute: 'support',
          value: 'getting-started'
        },
        {
          id: '21',
          title: 'Finance and support for your business',
          href: 'https://www.gov.uk/business-finance-support?regions%5B%5D=london',
          body: 'Find government-backed support and finance for business',
          attribute: 'support',
          value: 'growing'
        },
        {
          id: '22',
          title: 'Find coronavirus financial support for your business',
          href: 'https://www.gov.uk/business-coronavirus-support-finder',
          body: 'Coronavirus support is available to employers and the self-employed. You may be eligible for loans, tax relief and cash grants, whether your business is open or closed. Use this business support finder to see what support is available for you and your business.',
          attribute: 'support',
          value: 'covid-19'
        }
      ]
    },
    {
      title: 'Employing people',
      reasons: [
        {
          text: 'Your said you want to employ someone',
          attribute: 'employ',
          value: 'yes'
        }
      ],
      results: [
        {
          id: '30',
          title: 'Get your business ready to employ staff',
          href: 'https://www.gov.uk/get-ready-to-employ-someone',
          body: 'You need to register as an employer with HM Revenue and Customs (HMRC) when you start employing staff, or using subcontractors for construction work.',
          attribute: 'employ',
          value: 'yes'
        }
      ]
    },
    {
      title: 'Importing, exporting and doing business abroad',
      reasons: [
        {
          text: 'Your said your business buys goods from abroad',
          attribute: 'intent',
          value: 'import'
        },
        {
          text: 'Your said your business sells goods abroad',
          attribute: 'intent',
          value: 'export'
        }
      ],
      results: [
        {
          id: '40',
          title: 'Starting to import',
          href: 'https://www.gov.uk/starting-to-import',
          body: 'Importing goods and services into the UK - commodity codes, VAT and duty.',
          attribute: 'intent',
          value: 'import'
        },
        {
          id: '41',
          title: 'Exporting and doing business abroad',
          href: 'https://www.gov.uk/starting-to-export',
          body: 'What to do with exporting goods to other countries, including checking if you need a licence.',
          attribute: 'intent',
          value: 'export'
        }
      ]
    },
    {
      title: 'Licences and licence application',
      reasons: [
        {
          text: 'Your business is registered as: ',
          data: 'company-sector'
        },
        {
          text: 'Your business address is: ',
          data: 'company-address'
        }
      ],
      results: [
        {
          id: '50',
          title: 'Register a food business',
          // href: 'https://www.gov.uk/food-premises-approval/westminster',
          href: '/licence/start',
          body: 'Get in touch with your council for a premises licence if you run an establishment where meat, fish, egg or dairy products are handled.'
        },
        {
          id: '51',
          title: 'Tattoo, piercing and electrolysis licence (England and Wales)',
          href: 'https://www.gov.uk/skin-piercing-and-tattooing/tower-hamlets',
          body: 'You need to register with the relevant local council to get a tattoo, piercing and electrolysis licence in England and Wales'
        }
      ]
    },
    {
      title: 'Sale of goods and services and data protection',
      reasons: [
        {
          text: 'Your said your business stores or uses personal information',
          attribute: 'intent',
          value: 'data-protection'
        },
        {
          text: 'Your said your business sells goods online',
          attribute: 'intent',
          value: 'sell-online'
        }
      ],
      results: [
        {
          id: '60',
          title: 'Notification to process personal data',
          href: 'https://www.gov.uk/notification-to-process-personal-data',
          body: 'You must notify the Information Commissioner’s Office (ICO) if your organisation processes personal data in an automated form.',
          attribute: 'intent',
          value: 'data-protection'
        },
        {
          id: '61',
          title: 'Online and distance selling',
          href: 'https://www.gov.uk/online-and-distance-selling-for-businesses',
          body: 'Rules for online and distance selling for businesses.',
          attribute: 'intent',
          value: 'sell-online'
        }
      ]
    },
    {
      title: 'You may also be interested in',
      results: [
        {
          id: '70',
          title: 'Intellectual property and your work',
          href: 'https://www.gov.uk/intellectual-property-an-overview',
          body: 'What intellectual property is, how you can protect it, and which of copyright, patents, design right and trade marks applies to your work.',
          attribute: 'other',
          value: 'true'
        }
      ]
    }
  ]
}
