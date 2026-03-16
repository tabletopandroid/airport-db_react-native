import type { Airport } from '../src/types/airport';

export const mockAirport: Airport = {
  id: '1',
  type: 'airport',
  attributes: {
    name: 'Test International',
    code: 'TST',
    type: 'large_airport',
    latitude: '40.7128',
    longitude: '-74.0060',
    elevation: 15,
    gps_code: 'KTST',
    icao_code: 'KTST',
    iata_code: 'TST',
    local_code: 'TST',
  },
  relationships: {
    country: {
      data: {
        type: 'country',
        id: 'US',
      },
    },
    region: {
      data: {
        type: 'region',
        id: 'US-NY',
      },
    },
  },
  links: {
    self: {
      href: 'https://example.com/airports/1',
      rel: 'self',
      describedby: 'https://example.com/schema',
      title: 'Test International',
      type: 'application/json',
      hreflang: 'en',
      meta: {},
    },
  },
};
