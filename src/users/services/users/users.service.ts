import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUser = [
    { userName: 'zee', email: 'zeeshan@yottabyte.ltd' },
    { userName: 'shaur', email: 'shaur@yottabyte.ltd' },
    { userName: 'shaheer', email: 'shaheer@yottabyte.ltd' },
  ];
  fetchUsers() {
    return this.fakeUser;
  }

  fetchUserById(id: number) {
    return { id, userName: 'shaur', email: 'shaur@yottabyte.ltd' };
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUser.push(userDetails);
    return;
  }
}
