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
      reasons: [
        {
          text: 'You many need to register for corporation tax if you haven’t already',
        }
      ],
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
  ]
}
