import { Body, Controller, Delete, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { MongoExceptionFilter } from 'src/common/exceptions/mongo-exception.filter';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
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
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 404, description: `Not Found` })
  @Get(':id')
  async findById(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<User> {
    return await this.usersService.findById(id);
  }

  /**
   * This POST route needs to come BEFORE POST /:id
   *
   * see https://github.com/nestjs/nest/issues/995
   */
  @ApiOperation({ summary: `Search for users that match specific criteria` })
  @Post('search')
  async search(@Body() searchUserDto: SearchUserDto): Promise<User[]> {
    return await this.usersService.search(searchUserDto);
  }

  @ApiOperation({ summary: `Update a user given an id` })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 404, description: `Not Found` })
  @Post(':id')
  async updateUser(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: `Delete a user by id` })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: `Successfully deleted` })
  @ApiResponse({ status: 404, description: `Not Found` })
  @Delete(':id')
  async removeUser(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
