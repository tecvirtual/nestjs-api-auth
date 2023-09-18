import { Test } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { Cat } from '../entities/cat.entity';
import { catStub } from './__mocks__/cat.stub';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { userStub } from '../../users/tests/__mocks__/user.stub';

jest.mock('./__mocks__/cat.stub.ts');

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    let cat: Cat;

    beforeEach(async () => {
      cat = await catsController.findOne(catStub().id, userStub());
    });

    /*test('then it should call CatsService.findOne', () => {
      expect(catsService.findOne).toBeCalledWith(catStub().id, userStub());
    });*/

    test('then it should return the product', () => {
      expect(cat).toEqual(catStub());
    });
  });

  
});
