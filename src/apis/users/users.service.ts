import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, Scope } from '@nestjs/common';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import {
  IUserServiceCheckExistenceUser,
  IUserServiceFindOneUser,
  IUsersServiceCreate,
} from './interfaces/users-service.interface';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entities/user.entity';
import { EmailService } from '../email/email.service';
import { FindOneUserInput, FindOneUserOutput } from './dto/find-one.dto';
import { FindEmailUserOutput } from './dto/find-email.dto';

@Injectable({ scope: Scope.DEFAULT })
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async findOne(findOneUserInput: FindOneUserInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: findOneUserInput.email,
      },
    });
    return user;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email, name, password } = createUserInput;
    console.log(email, password, name);
    const existenceUser = await this.findOneByEmail({
      email,
    });
    if (existenceUser) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findOneByEmail({ email }: IUserServiceCheckExistenceUser) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  private async sendMemberJoinEmail(email: string, code: string) {
    await this.emailService.sendMemberJoinVerification(email, code);
  }

  // async verifyEmail(verifyEmailInput: VerifyEmailInput): Promise<string> {}
}
