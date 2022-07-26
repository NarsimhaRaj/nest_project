import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { EntityManager, IsNull, Not, Repository } from 'typeorm';

import { User } from 'src/entities';
import { UserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  login = async (session, { firstName }) => {
    const found = await this.userRepo.findOne({
      where: {
        firstName,
      },
    });
    if (found) {
      session.firstName = found.firstName;
      session.userId = found.id;
      return {
        isSuccess: true,
      };
    }
    return {
      isSuccess: false,
    };
  };

  getUserById = async (id) => {
    const data = await this.entityManager.query(
      'SELECT * FROM USERS WHERE id = ?',
      [id],
    );
    return {
      data,
    };
  };

  getAllUsers = async () => {
    const data = await this.userRepo.find({
      where: {
        firstName: Not(IsNull()),
      },
    });
    return {
      isSuccess: true,
      data,
    };
  };

  createUser = async (req: UserDto) => {
    try {
      const res = await this.userRepo.save({ ...req });
      return { isSuccess: true };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({ isSuccess: false });
    }
  };

  updateUser = async (id: number, req: UserDto) => {
    try {
      const found = await this.userRepo.findOne({ where: { id } });
      if (found) {
        await this.userRepo.update({ id }, req);
        return {
          isSuccess: true,
        };
      } else {
        return { isSuccess: false, message: 'user not found' };
      }
    } catch (err) {
      throw new InternalServerErrorException({ isSuccess: false });
    }
  };

  deleteUser = async (id: number) => {
    try {
      const found = await this.userRepo.findOne({ where: { id } });
      if (found) {
        await this.userRepo.remove(found);
        return { isSuccess: true };
      }
      return { isSuccess: false, message: 'user not found' };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({ isSuccess: false });
    }
  };
}
