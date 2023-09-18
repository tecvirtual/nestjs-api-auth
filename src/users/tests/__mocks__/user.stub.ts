import { Role } from "../../../common/enums/role.enum";
import { User } from "../../entities/user.entity";

export const userStub = (): User => {
  return {
    name: 'Product name',
    email: 'admin@gmail.com',
    password: '123456',
    role: Role.ADMIN,
    deletedAt: null,
    id: 1
  };
};