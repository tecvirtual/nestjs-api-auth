import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { userStub } from './__mocks__/user.stub';
import { mockUsersService } from './__mocks__/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    // arrange
    const createUserDto = {
      name: 'Chadwick',
      password: '123456',
      email: 'chadwickboseman@email.com',
    } as CreateUserDto;

    const user = {
      id: Date.now(),
      name: 'Chadwick',
      password: '123456',
      email: 'chadwickboseman@email.com',
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    // act
    const result = await controller.create(createUserDto);

    // assert
    expect(mockUsersService.create).toBeCalled();
    expect(mockUsersService.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
   
    const users = [userStub];
    jest.spyOn(mockUsersService, 'findAll').mockReturnValue(users);

    //act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUsersService.findAll).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = '1';

    jest.spyOn(mockUsersService, 'findOne').mockReturnValue(userStub);

    //act
    const result = await controller.findOne(id);

    // assert
    expect(result).toEqual(userStub);
    expect(mockUsersService.findOne).toBeCalled();
    expect(mockUsersService.findOne).toBeCalledWith(+id);
  });

  it('update => should find a user by a given id, update and then return its data', async () => {
    //arrange
    const id = '1';

    const updateUserDto = {
      name: 'Chadwick',
      password: '123456',
      email: 'chadwickboseman@email.com',
    } as UpdateUserDto;
    jest.spyOn(mockUsersService, 'update').mockReturnValue(userStub);

    //act
    const result = await controller.update(id, updateUserDto);

    // assert
    expect(result).toEqual(userStub);
    expect(mockUsersService.update).toBeCalled();
    expect(mockUsersService.update).toBeCalledWith(+id, updateUserDto);
  });

  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    //arrange
    const id = '1';
   
    jest.spyOn(mockUsersService, 'remove').mockReturnValue(userStub);

    //act
    const result = await controller.remove(id);

    // assert
    expect(result).toEqual(userStub);
    expect(mockUsersService.remove).toBeCalled();
    expect(mockUsersService.remove).toBeCalledWith(+id);
  });
});
