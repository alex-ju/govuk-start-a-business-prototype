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
  sections: [
    {
      title: 'Corporation Tax',
      results: [
        {
          id: '10',
          title: 'Register for Corporation Tax',
          href: 'https://www.gov.uk/corporation-tax',
          body: 'You need to register for corporation tax within 3 months of starting to do business.'
        }
      ]
    },
    {
      title: 'Competion law',
      results: [
        {
          id: '20',
          title: 'Avoid anti-competitive activity',
          href: 'https://www.gov.uk/cartels-price-fixing/types-of-anticompetitive-activity',
          body: 'You need to understand rules around price-fixing and competition.'
        }
      ]
    },
    {
      title: 'Data protection',
      results: [
        {
          id: '30',
          title: 'Dealing with personal information',
          href: 'https://www.gov.uk/data-protection-your-business',
          body: 'If your business stores anyone’s personal information, you need to know how to look after it.'
        }
      ]
    },
    {
      title: 'Business tax',
      reasons: [
        {
          text: 'your turnover is more than £85,000',
          attribute: 'vat',
          value: 'yes'
        },
        {
          text: 'your turnover might be more than £85,000 in future',
          attribute: 'vat',
          value: 'maybe'
        }
      ],
      results: [
        {
          id: '40',
          title: 'Register for VAT',
          href: 'https://www.gov.uk/vat-registration',
          body: 'You need to register your business for VAT if its VAT taxable turnover is more than £85,000.',
          attribute: 'vat',
          value: 'yes'
        },
        {
          id: '41',
          title: 'You might need to register for VAT',
          href: 'https://www.gov.uk/vat-registration/when-to-register',
          body: 'If your turnover is going to be more than £85,000, you need to register for VAT.',
          attribute: 'vat',
          value: 'maybe'
        }
      ]
    },
    {
      title: 'Employing people',
      reasons: [
        {
          text: 'you’re going to employ people',
          attribute: 'employ',
          value: 'yes'
        },
        {
          text: 'you already employ people',
          attribute: 'employ',
          value: 'already-employ-someone'
        },
        {
          text: 'you might employ people in future',
          attribute: 'employ',
          value: 'maybe'
        }
      ],
      results: [
        {
          id: '50',
          title: 'Employing people for the first time',
          href: 'https://www.gov.uk/get-ready-to-employ-someone',
          body: 'What you need to know about to employing people.',
          attribute: 'employ',
          value: 'yes'
        },
        {
          id: '51',
          title: 'Guidance on employing people',
          href: 'https://www.gov.uk/browse/employing-people',
          body: 'Read through the rules on employment and looking after your staff.',
          attribute: 'employ',
          value: 'already-employ-someone'
        },
        {
          id: '52',
          title: 'Employing people for the first time',
          href: 'https://www.gov.uk/get-ready-to-employ-someone',
          body: 'What you need to know if you decide to employ people in future.',
          attribute: 'employ',
          value: 'maybe'
        }
      ]
    },
    {
      title: 'Buying and selling abroad',
      reasons: [
        {
          text: 'you buy items from abroad',
          attribute: 'intent',
          value: 'import'
        },
        {
          text: 'you sell items to customers abroad',
          attribute: 'intent',
          value: 'export'
        },
        {
          text: 'you sell items online',
          attribute: 'intent',
          value: 'sell-online'
        }
      ],
      results: [
        {
          id: '60',
          title: 'How to buy items from abroad',
          href: 'https://www.gov.uk/import-goods-into-uk',
          body: 'Find out how to import items into the UK.',
          attribute: 'intent',
          value: 'import'
        },
        {
          id: '61',
          title: 'How to sell items abroad',
          href: 'https://www.gov.uk/export-goods',
          body: 'Find out how to export items out of the UK.',
          attribute: 'intent',
          value: 'export'
        },
        {
          id: '62',
          title: 'How to sell items online',
          href: 'https://www.gov.uk/online-and-distance-selling-for-businesses/online-selling',
          body: 'Rules you need to follow if you want to sell items online.',
          attribute: 'intent',
          value: 'sell-online'
        }
      ]
    },
    {
      title: 'Money and support',
      reasons: [
        {
          text: 'you’re looking for help to get started',
          attribute: 'support',
          value: 'getting-started'
        },
        {
          text: 'you’re looking for help to grow your business',
          attribute: 'support',
          value: 'growing'
        },
        {
          text: 'you’re looking for help because of coronavirus',
          attribute: 'support',
          value: 'covid-19'
        }
      ],
      results: [
        {
          id: '70',
          title: 'Apply for a ‘Start Up’ loan',
          href: 'https://www.gov.uk/apply-start-up-loan',
          body: 'Get a loan of between £500 to £25,000 to help get your business started.',
          attribute: 'support',
          value: 'getting-started'
        },
        {
          id: '71',
          title: 'See what finance and support is available',
          href: 'https://www.gov.uk/business-finance-support?business_stages%5B%5D=not-yet-trading',
          body: 'Look for support, based on where you are, your industry and size.',
          attribute: 'support',
          value: 'getting-started'
        },
        {
          id: '72',
          title: 'Get financial support to help grow your business',
          href: 'https://www.gov.uk/growing-your-business/get-extra-funding',
          body: 'Look through different sources of funding, including grants and loans.',
          attribute: 'support',
          value: 'growing'
        },
        {
          id: '73',
          title: 'Get financial support during coronavirus',
          href: 'https://www.gov.uk/business-coronavirus-support-finder',
          body: 'You might be able to get financial support if your business has been affected by coronavirus.',
          attribute: 'support',
          value: 'covid-19'
        }
      ]
    },
    {
      title: 'Business location',
      reasons: [
        {
          text: 'you’re running your business from home',
          attribute: 'premises',
          value: 'home'
        },
        {
          text: 'you’re running your business from a rented premises',
          attribute: 'premises',
          value: 'renting'
        }
      ],
      results: [
        {
          id: '80',
          title: 'Check the rules on running a business from home',
          href: 'https://www.gov.uk/run-business-from-home',
          body: 'You might need extra permissions or insurance when you run your business from home.',
          attribute: 'premises',
          value: 'home'
        },
        {
          id: '81',
          title: 'Your resonsibilities when renting',
          href: 'https://www.gov.uk/renting-business-property-tenant-responsibilities',
          body: 'Follow health and safety rules and make repairs when required by your lease.',
          attribute: 'premises',
          value: 'renting'
        },
        {
          id: '82',
          title: 'You’ll need to pay ‘business rates’',
          href: 'https://www.gov.uk/introduction-to-business-rates',
          body: 'Your local council will send you an annual bill to pay business rates for the property you rent.',
          attribute: 'premises',
          value: 'renting'
        }
      ]
    }
  ],
  check: [
    {
      title: 'Personal tax',
      results: [
        {
          id: '10',
          title: 'Check if you need to send a Self Assessment',
          href: 'https://www.gov.uk/check-if-you-need-tax-return',
          body: 'You might need to send a tax return if you have any untaxed income, such as dividends.'
        }
      ]
    },
    {
      title: 'Licences and certificates',
      results: [
        {
          id: '20',
          title: 'Check if you need a licence for your business',
          href: 'https://www.gov.uk/licence-finder/',
          body: 'You might need a licence, depending on the type of work you do.'
        }
      ]
    },
    {
      title: 'Business rates',
      reasons: [
        {
          text: 'you’re running your business from home',
          attribute: 'premises',
          value: 'home'
        }
      ],
      results: [
        {
          id: '30',
          title: 'Check if you need to pay business rates',
          href: 'https://www.gov.uk/introduction-to-business-rates/working-at-home',
          body: 'You might need to pay business rates depending on the work you do at home.',
          attribute: 'premises',
          value: 'home'
        }
      ]
    }
  ],
  maybe: [
    {
      title: 'Health and safety',
      results: [
        {
          id: '10',
          title: 'Health and safety at work',
          href: 'https://www.hse.gov.uk/guidance/index.htm',
          body: 'How to keep your employees and customers safe.'
        }
      ]
    },
    {
      title: 'Running a business',
      results: [
        {
          id: '20',
          title: 'Starting a business guidance',
          href: 'https://www.gov.uk/browse/business/setting-up',
          body: 'Information about starting and growing your business.'
        }
      ]
    },
    {
      title: 'Business tax',
      reasons: [
        {
          text: 'your turnover will be less than £85,000',
          attribute: 'vat',
          value: 'no'
        }
      ],
      results: [
        {
          id: '30',
          title: 'VAT registration is optional',
          href: 'https://www.gov.uk/vat-registration/when-to-register',
          body: 'As your business turnover is under £85,000, you do not have to register for VAT.',
          attribute: 'vat',
          value: 'no'
        }
      ]
    }
  ]
}
