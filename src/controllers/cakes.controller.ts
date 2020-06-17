import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Cakes} from '../models';
import {CakesRepository} from '../repositories';

export class CakesController {
  constructor(
    @repository(CakesRepository)
    public cakesRepository : CakesRepository,
  ) {}

  @post('/cakes', {
    responses: {
      '200': {
        description: 'Cakes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cakes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cakes, {
            title: 'NewCakes',
            exclude: ['id'],
          }),
        },
      },
    })
    cakes: Omit<Cakes, 'id'>,
  ): Promise<Cakes> {
    return this.cakesRepository.create(cakes);
  }

  @get('/cakes', {
    responses: {
      '200': {
        description: 'Array of Cakes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cakes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Cakes) filter?: Filter<Cakes>,
  ): Promise<Cakes[]> {
    return this.cakesRepository.find(filter);
  }

  @get('/cakes/{id}', {
    responses: {
      '200': {
        description: 'Cakes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cakes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cakes, {exclude: 'where'}) filter?: FilterExcludingWhere<Cakes>
  ): Promise<Cakes> {
    return this.cakesRepository.findById(id, filter);
  }

  @put('/cakes/{id}', {
    responses: {
      '204': {
        description: 'Cakes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cakes: Cakes,
  ): Promise<void> {
    await this.cakesRepository.replaceById(id, cakes);
  }

  @del('/cakes/{id}', {
    responses: {
      '204': {
        description: 'Cakes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cakesRepository.deleteById(id);
  }
}
