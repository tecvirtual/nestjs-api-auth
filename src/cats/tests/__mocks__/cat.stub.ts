import { User } from 'src/users/entities/user.entity';
import { Cat } from '../../entities/cat.entity';
import { breedStub } from './breed.stub';
import { userStub } from '../../../users/tests/__mocks__/user.stub';
import { Breed } from '../../../breeds/entities/breed.entity';

export const catStub = (): Cat => {
    const breed: Breed = breedStub();
    const user: User = userStub();
    return {
        name: 'Product name',
        age: 10,
        deletedAt: null,
        userEmail: 'admin@gmail.com',
        breed: breed,
        id: 1,
        user: user,
    };
};