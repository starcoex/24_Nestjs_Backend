import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UsersModule } from './apis/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import {
  PrismaModule,
  QueryInfo,
  loggingMiddleware,
  PrismaService,
} from 'nestjs-prisma';
import { createSoftDeleteMiddleware } from 'prisma-soft-delete-middleware';
import { ProductsSalesLocationsModule } from './apis/productsSalesLocations/productsSalesLocations.module';
import { AuthModule } from './apis/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailModule } from './apis/email/email.module';
import { CoreModule } from './apis/core/core.module';
import { PointsTransactionsModule } from './apis/points-transactions/points-transactions.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './apis/auth/guards/accessToken.guard';
import { FilesModule } from './apis/files/files.module';
import { AwsModule } from './apis/aws/aws.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { UploadModule } from './apis/upload/upload.module';
import { FtpModule } from 'nestjs-ftp';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd() + '/src/apis/commons/graphql/schema.gql',
      ),
      sortSchema: true,
      playground: false,
      csrfPrevention: false,
      path: 'graphql',
      context: async ({ req, res }) => ({ req, res }),
      // context: async ({ req, res }: { req: Request; res: Response }) => {
      //   return { req, res };
      // },
      formatError(formattedError) {
        console.log(formattedError);
        return formattedError;
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
          createSoftDeleteMiddleware({
            models: {
              Product: true,
            },
            defaultConfig: {
              field: 'deletedAt',
              createValue: (deletedAt) => {
                if (deletedAt) return new Date();
                return null;
              },
              allowToOneUpdates: true,
              allowCompoundUniqueIndexWhere: true,
            },
          }),
        ],
      },
    }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAILER_AUTH_USER}:${process.env.MAILER_AUTH_PASSWORD}@${process.env.MAILER_HOST}`,
      defaults: {
        from: `"${process.env.MAILER_FROM_USER_NAME}" <${process.env.MAILER_AUTH_USER}>`,
      },
      template: {
        dir: __dirname + '/src/apis/email/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        return {
          host: process.env.STARCOEX_FTP_UBUNTU_HOST,
          password: process.env.STARCOEX_FTP_UBUNTU_PASSWORD,
          port: Number(process.env.STARCOEX_FTP_UBUNTU_PORT),
          user: process.env.STARCOEX_FTP_UBUNTU_USERNAME,
          secure: Boolean(process.env.STARCOEX_FTP_UBUNTU_SECURE),
        };
      },
      inject: [ConfigService],
    }),
    CoreModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    ProductsSalesLocationsModule,
    PointsTransactionsModule,
    FilesModule,
    AwsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(graphqlUploadExpress()).forRoutes({
//       path: '/graphql',
//       method: RequestMethod.ALL,
//     });
//   }
// }
export class AppModule {}
