import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  // getUsers(@Query('sortByDesc', ParseBoolPipe) sortByDesc: boolean) {
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age);
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe is to use convert string param into number also validate
    console.log(id);
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Get('/posts')
  getUsersPosts() {
    return [
      {
        userName: 'zee',
        email: 'zeeshan@yottabyte.ltd',
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }

  @Get('/posts/comments')
  getUsersPostsComments() {
    return [
      {
        userName: 'zee',
        email: 'zeeshan@yottabyte.ltd',
        posts: [
          {
            id: 1,
            title: 'Post 1',
            comments: [],
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }
}
