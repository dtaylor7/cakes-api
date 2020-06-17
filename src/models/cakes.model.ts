import {Entity, model, property} from '@loopback/repository';

@model()
export class Cakes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'number',
    required: true,
  })
  yumFactor: number;


  constructor(data?: Partial<Cakes>) {
    super(data);
  }
}

export interface CakesRelations {
  // describe navigational properties here
}

export type CakesWithRelations = Cakes & CakesRelations;
