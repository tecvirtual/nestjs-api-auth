import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { CreateCatDto } from '../dto/create-cat.dto';
import { Cat } from '../entities/cat.entity';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { catStub } from './__mocks__/cat.stub';
import { userStub } from '../../users/tests/__mocks__/user.stub';
import { mockCatsService } from './__mocks__/cats.service';
import { JwtModule } from '@nestjs/jwt';
import { breedStub } from './__mocks__/breed.stub';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new cat by a given data', async () => {
    // arrange
    const createCatDto = {
        name: 'Cat name',
        age: 10,
        deletedAt: null,
        userEmail: 'admin@gmail.com',
        breed: 'Persa',
    } as CreateCatDto;

    const cat = {
        id: 1,
        name: 'Cat name', // Fill this with a valid name
        age: 2, // Fill this with a valid age
        breed: breedStub(), // Fill this with a valid breed (optional)
        deletedAt: null,
        user: userStub(),
    } as Cat;

    jest.spyOn(mockCatsService, 'create').mockReturnValue(cat);

    // act
    const result = await controller.create(createCatDto, userStub());

    // assert
    expect(mockCatsService.create).toBeCalled();
    expect(mockCatsService.create).toBeCalledWith(createCatDto, userStub());

    expect(result).toEqual(cat);
  });

  it('findAll => should return an array of cat', async () => {
    //arrange
   
    const users = [catStub];
    jest.spyOn(mockCatsService, 'findAll').mockReturnValue(users);

    //act
    const result = await controller.findAll(userStub());

    // assert
    expect(result).toEqual(users);
    expect(mockCatsService.findAll).toBeCalled();
  });

  it('findOne => should find a cat by a given id and return its data', async () => {
    //arrange
    const id = '1';

    jest.spyOn(mockCatsService, 'findOne').mockReturnValue(catStub);

    //act
    const result = await controller.findOne(+id, userStub());

    // assert
    expect(result).toEqual(catStub);
    expect(mockCatsService.findOne).toBeCalled();
    expect(mockCatsService.findOne).toBeCalledWith(+id, userStub());
  });

  it('update => should find a cat by a given id, update and then return its data', async () => {
    //arrange
    const id = '1';

    const updateUserDto = {
        name: 'Cat name',
        age: 10,
        deletedAt: null,
        userEmail: 'admin@gmail.com',
        breed: 'Persa',
    } as UpdateCatDto;
    jest.spyOn(mockCatsService, 'update').mockReturnValue(catStub);

    //act
    const result = await controller.update(+id, updateUserDto, userStub());

    // assert
    expect(result).toEqual(catStub);
    expect(mockCatsService.update).toBeCalled();
    expect(mockCatsService.update).toBeCalledWith(+id, updateUserDto, userStub());
  });

  it('remove => should find a cat by a given id, remove and then return Number of affected rows', async () => {
    //arrange
    const id = '1';
   
    jest.spyOn(mockCatsService, 'remove').mockReturnValue(catStub);

    //act
    const result = await controller.remove(+id, userStub());

    // assert
    expect(result).toEqual(catStub);
    expect(mockCatsService.remove).toBeCalled();
    expect(mockCatsService.remove).toBeCalledWith(+id, userStub());
  });
  
});
