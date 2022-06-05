export type MovementType = 'in' | 'out';

export interface Movement {
  _id: string;
  title: string;
  description: string;
  cardId: string;
  amount: number;
  type: MovementType;
  timestamp: number;
}

export interface MovementsApi {
  data: Movement[],
  total: number
}
