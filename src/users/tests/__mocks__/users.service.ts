import { userStub } from "./user.stub";

/*export const mockUsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(userStub()),
  findAll: jest.fn().mockReturnValue([userStub()]),
  findOne: jest.fn().mockReturnValue(userStub()),
  update: jest.fn().mockReturnValue(userStub()),
  remove: jest.fn().mockReturnValue(userStub()),
});*/

export const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };