export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
}

export const SAMPLE_PHARMACIES: Pharmacy[] = [
  {
    id: '1',
    name: 'MediCare Central Pharmacy',
    address: '123 Health Avenue, Downtown',
    lat: 40.7128,
    lng: -74.006,
    phone: '+1 (212) 555-0101',
    hours: 'Mon–Fri 8am–9pm, Sat–Sun 9am–6pm',
  },
  {
    id: '2',
    name: 'GreenCross Pharmacy',
    address: '456 Wellness Blvd, Midtown',
    lat: 40.7549,
    lng: -73.984,
    phone: '+1 (212) 555-0202',
    hours: 'Mon–Sun 7am–10pm',
  },
  {
    id: '3',
    name: 'HealthFirst Drugstore',
    address: '789 Care Street, Uptown',
    lat: 40.7831,
    lng: -73.9712,
    phone: '+1 (212) 555-0303',
    hours: 'Mon–Fri 9am–8pm, Sat 10am–6pm',
  },
  {
    id: '4',
    name: 'Sunrise Pharmacy & Wellness',
    address: '321 Sunrise Road, East Side',
    lat: 40.7282,
    lng: -73.9442,
    phone: '+1 (718) 555-0404',
    hours: 'Mon–Sun 8am–11pm',
  },
  {
    id: '5',
    name: 'CityMed Pharmacy',
    address: '654 Urban Lane, West Village',
    lat: 40.7336,
    lng: -74.0027,
    phone: '+1 (212) 555-0505',
    hours: 'Mon–Fri 8am–8pm, Sat 9am–5pm',
  },
  {
    id: '6',
    name: 'QuickCare Pharmacy',
    address: '987 Express Way, Financial District',
    lat: 40.7074,
    lng: -74.0113,
    phone: '+1 (212) 555-0606',
    hours: 'Mon–Fri 7am–9pm, Sat–Sun 9am–7pm',
  },
  {
    id: '7',
    name: 'Neighborhood Apothecary',
    address: '147 Community Drive, Brooklyn',
    lat: 40.6782,
    lng: -73.9442,
    phone: '+1 (718) 555-0707',
    hours: 'Mon–Sat 9am–8pm, Sun 10am–5pm',
  },
  {
    id: '8',
    name: 'PharmaPlus 24/7',
    address: '258 Night Owl Street, Queens',
    lat: 40.7282,
    lng: -73.7949,
    phone: '+1 (718) 555-0808',
    hours: 'Open 24 hours, 7 days a week',
  },
  {
    id: '9',
    name: 'Harmony Health Pharmacy',
    address: '369 Balance Ave, Bronx',
    lat: 40.8448,
    lng: -73.8648,
    phone: '+1 (718) 555-0909',
    hours: 'Mon–Fri 8am–7pm, Sat 9am–4pm',
  },
  {
    id: '10',
    name: 'Vitality Pharmacy',
    address: '741 Energy Blvd, Staten Island',
    lat: 40.5795,
    lng: -74.1502,
    phone: '+1 (718) 555-1010',
    hours: 'Mon–Sat 9am–7pm, Sun 10am–4pm',
  },
  {
    id: '11',
    name: 'TrustCare Pharmacy',
    address: '852 Reliable Road, Harlem',
    lat: 40.8116,
    lng: -73.9465,
    phone: '+1 (212) 555-1111',
    hours: 'Mon–Sun 8am–9pm',
  },
  {
    id: '12',
    name: 'Metro Pharmacy Hub',
    address: '963 Transit Plaza, Long Island City',
    lat: 40.7447,
    lng: -73.9485,
    phone: '+1 (718) 555-1212',
    hours: 'Mon–Fri 7am–10pm, Sat–Sun 8am–8pm',
  },
];
