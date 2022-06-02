export interface Location {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  coords: [number, number]
}

export interface DayWithSlots {
  day: string;
  slots: Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24>;
}

export interface DayWithSlot {
  day: string;
  slot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
}
