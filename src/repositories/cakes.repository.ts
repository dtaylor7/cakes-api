import {DefaultCrudRepository} from '@loopback/repository';
import {Cakes, CakesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CakesRepository extends DefaultCrudRepository<
  Cakes,
  typeof Cakes.prototype.id,
  CakesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cakes, dataSource);
  }
}
