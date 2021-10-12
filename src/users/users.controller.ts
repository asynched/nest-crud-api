import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name)

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      return await this.usersService.findOne(id)
    } catch (error) {
      this.logger.error(error)
      return response.status(404).json({
        message: `User with id "${id}" was not found`,
      })
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto)
    } catch (error) {
      this.logger.error(error)
      return response.status(400).json({
        error: error,
      })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      return await this.usersService.remove(id)
    } catch (error) {
      this.logger.error(error)
      return response.status(404).json({
        message: `User with id "${id}" was not found`,
      })
    }
  }
}
