// import {
//   Injectable,
//   OnModuleInit,
//   Logger,
//   OnModuleDestroy,
// } from '@nestjs/common';
// import { Prisma, PrismaClient } from '@prisma/client';
// import { createSoftDeleteMiddleware } from 'prisma-soft-delete-middleware';

// @Injectable()
// class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   private readonly logger = new Logger(PrismaService.name);

//   constructor() {
//     super({
//       log: [
//         {
//           emit: 'event',
//           level: 'query',
//         },
//         {
//           emit: 'event',
//           level: 'error',
//         },
//         {
//           emit: 'event',
//           level: 'info',
//         },
//         {
//           emit: 'event',
//           level: 'warn',
//         },
//       ],
//     });
//   }

//   async onModuleInit() {
//     // this.$on('error', (event) => {
//     //   this.logger.error(event);
//     // });
//     // this.$on('warn', (event) => {
//     //   this.logger.warn(event);
//     // });
//     // this.$on('info', (event) => {
//     //   this.logger.verbose(event);
//     // });
//     // this.$on('query', (event) => {
//     //   this.logger.log(event);
//     // });
//     await this.$connect();
//     // this.$use(this.loggingMiddleware);
//     // this.$use(this.productSoftDeleteMiddleware);
//     // this.$use(this.productFindMiddleware);
//     this.$use(
//       createSoftDeleteMiddleware({
//         models: {
//           Product: true,
//         },
//         defaultConfig: {
//           field: 'deletedAt',
//           createValue: (deletedAt) => {
//             if (deletedAt) return new Date();
//             return null;
//           },
//           allowToOneUpdates: true,
//           allowCompoundUniqueIndexWhere: true,
//         },
//       }),
//     );
//   }

//   // loggingMiddleware: Prisma.Middleware = async (params, next) => {
//   //   console.log(
//   //     `${params.action} ${params.model} ${JSON.stringify(params.args)}`,
//   //   );
//   //   const result = await next(params);
//   //   console.log(result);
//   //   return result;
//   // };
//   // productSoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
//   //   if (params.model !== 'Product') {
//   //     return next(params);
//   //   }
//   //   if (params.action === 'delete') {
//   //     return next({
//   //       ...params,
//   //       action: 'update',
//   //       args: {
//   //         ...params.args,
//   //         data: {
//   //           deletedAt: new Date(),
//   //         },
//   //       },
//   //     });
//   //   }
//   //   return next(params);
//   // };
//   // productFindMiddleware: Prisma.Middleware = async (params, next) => {
//   //   if (params.model !== 'Product') {
//   //     return next(params);
//   //   }
//   //   if (params.action === 'findUnique' || params.action === 'findFirst') {
//   //     return next({
//   //       ...params,
//   //       action: 'findFirst',
//   //       args: {
//   //         ...params.args,
//   //         where: {
//   //           ...params.args?.where,
//   //           deletedAt: null,
//   //         },
//   //       },
//   //     });
//   //   }
//   //   if (params.action === 'findMany') {
//   //     return next({
//   //       ...params,
//   //       args: {
//   //         ...params.args,
//   //         where: {
//   //           ...params.args?.where,
//   //           deletedAt: null,
//   //         },
//   //       },
//   //     });
//   //   }
//   //   return next(params);
//   // };

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }
// }
