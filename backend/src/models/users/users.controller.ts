import { Body, Controller, Delete, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MongoExceptionFilter } from 'src/common/exceptions/mongo-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiResponse({ status: 400, description: `Bad Request` })
@ApiResponse({ status: 500, description: `Internal Server Error` })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `Create a new user` })
  @Post()
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: `Fetches all users` })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: `Find a user by id` })
  @ApiResponse({ status: 404, description: `Not Found` })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @ApiOperation({ summary: `Update a user given an id` })
  @ApiResponse({ status: 404, description: `Not Found` })
  @Post(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: `Search for a user` })
  @Post('search')
  async search(@Body() searchUserDto: SearchUserDto): Promise<User[]> {
    return await this.usersService.search(searchUserDto);
  }

  @ApiOperation({ summary: `Delete a user by id` })
  @Delete(':id')
  @ApiResponse({ status: 200, description: `Successfully deleted` })
  @ApiResponse({ status: 404, description: `Not Found` })
  async removeUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
