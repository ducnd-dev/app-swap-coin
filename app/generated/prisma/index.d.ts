
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model PriceAlert
 * 
 */
export type PriceAlert = $Result.DefaultSelection<Prisma.$PriceAlertPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AdminConfig
 * 
 */
export type AdminConfig = $Result.DefaultSelection<Prisma.$AdminConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceAlert`: Exposes CRUD operations for the **PriceAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceAlerts
    * const priceAlerts = await prisma.priceAlert.findMany()
    * ```
    */
  get priceAlert(): Prisma.PriceAlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminConfig`: Exposes CRUD operations for the **AdminConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminConfigs
    * const adminConfigs = await prisma.adminConfig.findMany()
    * ```
    */
  get adminConfig(): Prisma.AdminConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Wallet: 'Wallet',
    Token: 'Token',
    Transaction: 'Transaction',
    PriceAlert: 'PriceAlert',
    Notification: 'Notification',
    AdminConfig: 'AdminConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "wallet" | "token" | "transaction" | "priceAlert" | "notification" | "adminConfig"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.WalletFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.WalletAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TokenFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TokenAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.TransactionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.TransactionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      PriceAlert: {
        payload: Prisma.$PriceAlertPayload<ExtArgs>
        fields: Prisma.PriceAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          findFirst: {
            args: Prisma.PriceAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          findMany: {
            args: Prisma.PriceAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>[]
          }
          create: {
            args: Prisma.PriceAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          createMany: {
            args: Prisma.PriceAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PriceAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          update: {
            args: Prisma.PriceAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          deleteMany: {
            args: Prisma.PriceAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PriceAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceAlertPayload>
          }
          aggregate: {
            args: Prisma.PriceAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceAlert>
          }
          groupBy: {
            args: Prisma.PriceAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceAlertGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PriceAlertFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PriceAlertAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PriceAlertCountArgs<ExtArgs>
            result: $Utils.Optional<PriceAlertCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.NotificationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.NotificationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AdminConfig: {
        payload: Prisma.$AdminConfigPayload<ExtArgs>
        fields: Prisma.AdminConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          findFirst: {
            args: Prisma.AdminConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          findMany: {
            args: Prisma.AdminConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>[]
          }
          create: {
            args: Prisma.AdminConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          createMany: {
            args: Prisma.AdminConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          update: {
            args: Prisma.AdminConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          deleteMany: {
            args: Prisma.AdminConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminConfigPayload>
          }
          aggregate: {
            args: Prisma.AdminConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminConfig>
          }
          groupBy: {
            args: Prisma.AdminConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminConfigGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AdminConfigFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AdminConfigAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AdminConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AdminConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    wallet?: WalletOmit
    token?: TokenOmit
    transaction?: TransactionOmit
    priceAlert?: PriceAlertOmit
    notification?: NotificationOmit
    adminConfig?: AdminConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    wallets: number
    transactions: number
    priceAlerts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    priceAlerts?: boolean | UserCountOutputTypeCountPriceAlertsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPriceAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceAlertWhereInput
  }


  /**
   * Count Type TokenCountOutputType
   */

  export type TokenCountOutputType = {
    fromTransactions: number
    toTransactions: number
    priceAlerts: number
  }

  export type TokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromTransactions?: boolean | TokenCountOutputTypeCountFromTransactionsArgs
    toTransactions?: boolean | TokenCountOutputTypeCountToTransactionsArgs
    priceAlerts?: boolean | TokenCountOutputTypeCountPriceAlertsArgs
  }

  // Custom InputTypes
  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenCountOutputType
     */
    select?: TokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountFromTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountToTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountPriceAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceAlertWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    telegramId: number | null
    activityPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    telegramId: number | null
    activityPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    telegramId: number | null
    username: string | null
    firstName: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activityPoints: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    telegramId: number | null
    username: string | null
    firstName: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activityPoints: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    firstName: number
    language: number
    createdAt: number
    updatedAt: number
    activityPoints: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    telegramId?: true
    activityPoints?: true
  }

  export type UserSumAggregateInputType = {
    telegramId?: true
    activityPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    activityPoints?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    activityPoints?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    firstName?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    activityPoints?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    telegramId: number
    username: string | null
    firstName: string | null
    language: string | null
    createdAt: Date
    updatedAt: Date
    activityPoints: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityPoints?: boolean
    wallets?: boolean | User$walletsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    priceAlerts?: boolean | User$priceAlertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    firstName?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityPoints?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "firstName" | "language" | "createdAt" | "updatedAt" | "activityPoints", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallets?: boolean | User$walletsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    priceAlerts?: boolean | User$priceAlertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wallets: Prisma.$WalletPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      priceAlerts: Prisma.$PriceAlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: number
      username: string | null
      firstName: string | null
      language: string | null
      createdAt: Date
      updatedAt: Date
      activityPoints: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceAlerts<T extends User$priceAlertsArgs<ExtArgs> = {}>(args?: Subset<T, User$priceAlertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly telegramId: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly activityPoints: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.priceAlerts
   */
  export type User$priceAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    where?: PriceAlertWhereInput
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    cursor?: PriceAlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceAlertScalarFieldEnum | PriceAlertScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    type: string | null
    isDefault: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    type: string | null
    isDefault: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    address: number
    name: number
    type: number
    isDefault: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    address?: true
    name?: true
    type?: true
    isDefault?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    address?: true
    name?: true
    type?: true
    isDefault?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    address?: true
    name?: true
    type?: true
    isDefault?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    address: string
    name: string | null
    type: string
    isDefault: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    name?: boolean
    type?: boolean
    isDefault?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>



  export type WalletSelectScalar = {
    id?: boolean
    address?: boolean
    name?: boolean
    type?: boolean
    isDefault?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "name" | "type" | "isDefault" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      name: string | null
      type: string
      isDefault: boolean
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * @param {WalletFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const wallet = await prisma.wallet.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: WalletFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Wallet.
     * @param {WalletAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const wallet = await prisma.wallet.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: WalletAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly name: FieldRef<"Wallet", 'String'>
    readonly type: FieldRef<"Wallet", 'String'>
    readonly isDefault: FieldRef<"Wallet", 'Boolean'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet findRaw
   */
  export type WalletFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Wallet aggregateRaw
   */
  export type WalletAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    decimals: number | null
  }

  export type TokenSumAggregateOutputType = {
    decimals: number | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    name: string | null
    icon: string | null
    contractAddress: string | null
    decimals: number | null
    network: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    name: string | null
    icon: string | null
    contractAddress: string | null
    decimals: number | null
    network: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    symbol: number
    name: number
    icon: number
    contractAddress: number
    decimals: number
    network: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    decimals?: true
  }

  export type TokenSumAggregateInputType = {
    decimals?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    icon?: true
    contractAddress?: true
    decimals?: true
    network?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    icon?: true
    contractAddress?: true
    decimals?: true
    network?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    symbol?: true
    name?: true
    icon?: true
    contractAddress?: true
    decimals?: true
    network?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    symbol: string
    name: string
    icon: string | null
    contractAddress: string | null
    decimals: number
    network: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    name?: boolean
    icon?: boolean
    contractAddress?: boolean
    decimals?: boolean
    network?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromTransactions?: boolean | Token$fromTransactionsArgs<ExtArgs>
    toTransactions?: boolean | Token$toTransactionsArgs<ExtArgs>
    priceAlerts?: boolean | Token$priceAlertsArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>



  export type TokenSelectScalar = {
    id?: boolean
    symbol?: boolean
    name?: boolean
    icon?: boolean
    contractAddress?: boolean
    decimals?: boolean
    network?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "name" | "icon" | "contractAddress" | "decimals" | "network" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromTransactions?: boolean | Token$fromTransactionsArgs<ExtArgs>
    toTransactions?: boolean | Token$toTransactionsArgs<ExtArgs>
    priceAlerts?: boolean | Token$priceAlertsArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      fromTransactions: Prisma.$TransactionPayload<ExtArgs>[]
      toTransactions: Prisma.$TransactionPayload<ExtArgs>[]
      priceAlerts: Prisma.$PriceAlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      name: string
      icon: string | null
      contractAddress: string | null
      decimals: number
      network: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * @param {TokenFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const token = await prisma.token.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TokenFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Token.
     * @param {TokenAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const token = await prisma.token.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TokenAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromTransactions<T extends Token$fromTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, Token$fromTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    toTransactions<T extends Token$toTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, Token$toTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceAlerts<T extends Token$priceAlertsArgs<ExtArgs> = {}>(args?: Subset<T, Token$priceAlertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly symbol: FieldRef<"Token", 'String'>
    readonly name: FieldRef<"Token", 'String'>
    readonly icon: FieldRef<"Token", 'String'>
    readonly contractAddress: FieldRef<"Token", 'String'>
    readonly decimals: FieldRef<"Token", 'Int'>
    readonly network: FieldRef<"Token", 'String'>
    readonly isActive: FieldRef<"Token", 'Boolean'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly updatedAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token findRaw
   */
  export type TokenFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Token aggregateRaw
   */
  export type TokenAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Token.fromTransactions
   */
  export type Token$fromTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Token.toTransactions
   */
  export type Token$toTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Token.priceAlerts
   */
  export type Token$priceAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    where?: PriceAlertWhereInput
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    cursor?: PriceAlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceAlertScalarFieldEnum | PriceAlertScalarFieldEnum[]
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    rate: number | null
    slippage: number | null
  }

  export type TransactionSumAggregateOutputType = {
    rate: number | null
    slippage: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fromTokenId: string | null
    toTokenId: string | null
    fromAmount: string | null
    toAmount: string | null
    rate: number | null
    status: string | null
    txHash: string | null
    walletAddress: string | null
    slippage: number | null
    gasFee: string | null
    isSimulated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fromTokenId: string | null
    toTokenId: string | null
    fromAmount: string | null
    toAmount: string | null
    rate: number | null
    status: string | null
    txHash: string | null
    walletAddress: string | null
    slippage: number | null
    gasFee: string | null
    isSimulated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    fromTokenId: number
    toTokenId: number
    fromAmount: number
    toAmount: number
    rate: number
    status: number
    txHash: number
    walletAddress: number
    slippage: number
    gasFee: number
    isSimulated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    rate?: true
    slippage?: true
  }

  export type TransactionSumAggregateInputType = {
    rate?: true
    slippage?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    fromTokenId?: true
    toTokenId?: true
    fromAmount?: true
    toAmount?: true
    rate?: true
    status?: true
    txHash?: true
    walletAddress?: true
    slippage?: true
    gasFee?: true
    isSimulated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    fromTokenId?: true
    toTokenId?: true
    fromAmount?: true
    toAmount?: true
    rate?: true
    status?: true
    txHash?: true
    walletAddress?: true
    slippage?: true
    gasFee?: true
    isSimulated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    fromTokenId?: true
    toTokenId?: true
    fromAmount?: true
    toAmount?: true
    rate?: true
    status?: true
    txHash?: true
    walletAddress?: true
    slippage?: true
    gasFee?: true
    isSimulated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    fromTokenId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash: string | null
    walletAddress: string
    slippage: number | null
    gasFee: string | null
    isSimulated: boolean
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromTokenId?: boolean
    toTokenId?: boolean
    fromAmount?: boolean
    toAmount?: boolean
    rate?: boolean
    status?: boolean
    txHash?: boolean
    walletAddress?: boolean
    slippage?: boolean
    gasFee?: boolean
    isSimulated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    fromToken?: boolean | TokenDefaultArgs<ExtArgs>
    toToken?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>



  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    fromTokenId?: boolean
    toTokenId?: boolean
    fromAmount?: boolean
    toAmount?: boolean
    rate?: boolean
    status?: boolean
    txHash?: boolean
    walletAddress?: boolean
    slippage?: boolean
    gasFee?: boolean
    isSimulated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fromTokenId" | "toTokenId" | "fromAmount" | "toAmount" | "rate" | "status" | "txHash" | "walletAddress" | "slippage" | "gasFee" | "isSimulated" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    fromToken?: boolean | TokenDefaultArgs<ExtArgs>
    toToken?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      fromToken: Prisma.$TokenPayload<ExtArgs>
      toToken: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fromTokenId: string
      toTokenId: string
      fromAmount: string
      toAmount: string
      rate: number
      status: string
      txHash: string | null
      walletAddress: string
      slippage: number | null
      gasFee: string | null
      isSimulated: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * @param {TransactionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const transaction = await prisma.transaction.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: TransactionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Transaction.
     * @param {TransactionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const transaction = await prisma.transaction.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: TransactionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromToken<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toToken<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly fromTokenId: FieldRef<"Transaction", 'String'>
    readonly toTokenId: FieldRef<"Transaction", 'String'>
    readonly fromAmount: FieldRef<"Transaction", 'String'>
    readonly toAmount: FieldRef<"Transaction", 'String'>
    readonly rate: FieldRef<"Transaction", 'Float'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly txHash: FieldRef<"Transaction", 'String'>
    readonly walletAddress: FieldRef<"Transaction", 'String'>
    readonly slippage: FieldRef<"Transaction", 'Float'>
    readonly gasFee: FieldRef<"Transaction", 'String'>
    readonly isSimulated: FieldRef<"Transaction", 'Boolean'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction findRaw
   */
  export type TransactionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Transaction aggregateRaw
   */
  export type TransactionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model PriceAlert
   */

  export type AggregatePriceAlert = {
    _count: PriceAlertCountAggregateOutputType | null
    _avg: PriceAlertAvgAggregateOutputType | null
    _sum: PriceAlertSumAggregateOutputType | null
    _min: PriceAlertMinAggregateOutputType | null
    _max: PriceAlertMaxAggregateOutputType | null
  }

  export type PriceAlertAvgAggregateOutputType = {
    targetPrice: number | null
  }

  export type PriceAlertSumAggregateOutputType = {
    targetPrice: number | null
  }

  export type PriceAlertMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenId: string | null
    targetPrice: number | null
    condition: string | null
    isTriggered: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceAlertMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenId: string | null
    targetPrice: number | null
    condition: string | null
    isTriggered: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceAlertCountAggregateOutputType = {
    id: number
    userId: number
    tokenId: number
    targetPrice: number
    condition: number
    isTriggered: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriceAlertAvgAggregateInputType = {
    targetPrice?: true
  }

  export type PriceAlertSumAggregateInputType = {
    targetPrice?: true
  }

  export type PriceAlertMinAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    targetPrice?: true
    condition?: true
    isTriggered?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceAlertMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    targetPrice?: true
    condition?: true
    isTriggered?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceAlertCountAggregateInputType = {
    id?: true
    userId?: true
    tokenId?: true
    targetPrice?: true
    condition?: true
    isTriggered?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceAlert to aggregate.
     */
    where?: PriceAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceAlerts to fetch.
     */
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceAlerts
    **/
    _count?: true | PriceAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceAlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceAlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceAlertMaxAggregateInputType
  }

  export type GetPriceAlertAggregateType<T extends PriceAlertAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceAlert[P]>
      : GetScalarType<T[P], AggregatePriceAlert[P]>
  }




  export type PriceAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceAlertWhereInput
    orderBy?: PriceAlertOrderByWithAggregationInput | PriceAlertOrderByWithAggregationInput[]
    by: PriceAlertScalarFieldEnum[] | PriceAlertScalarFieldEnum
    having?: PriceAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceAlertCountAggregateInputType | true
    _avg?: PriceAlertAvgAggregateInputType
    _sum?: PriceAlertSumAggregateInputType
    _min?: PriceAlertMinAggregateInputType
    _max?: PriceAlertMaxAggregateInputType
  }

  export type PriceAlertGroupByOutputType = {
    id: string
    userId: string
    tokenId: string
    targetPrice: number
    condition: string
    isTriggered: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PriceAlertCountAggregateOutputType | null
    _avg: PriceAlertAvgAggregateOutputType | null
    _sum: PriceAlertSumAggregateOutputType | null
    _min: PriceAlertMinAggregateOutputType | null
    _max: PriceAlertMaxAggregateOutputType | null
  }

  type GetPriceAlertGroupByPayload<T extends PriceAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceAlertGroupByOutputType[P]>
            : GetScalarType<T[P], PriceAlertGroupByOutputType[P]>
        }
      >
    >


  export type PriceAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenId?: boolean
    targetPrice?: boolean
    condition?: boolean
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceAlert"]>



  export type PriceAlertSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenId?: boolean
    targetPrice?: boolean
    condition?: boolean
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tokenId" | "targetPrice" | "condition" | "isTriggered" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["priceAlert"]>
  export type PriceAlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    token?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $PriceAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceAlert"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      token: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenId: string
      targetPrice: number
      condition: string
      isTriggered: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["priceAlert"]>
    composites: {}
  }

  type PriceAlertGetPayload<S extends boolean | null | undefined | PriceAlertDefaultArgs> = $Result.GetResult<Prisma.$PriceAlertPayload, S>

  type PriceAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceAlertCountAggregateInputType | true
    }

  export interface PriceAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceAlert'], meta: { name: 'PriceAlert' } }
    /**
     * Find zero or one PriceAlert that matches the filter.
     * @param {PriceAlertFindUniqueArgs} args - Arguments to find a PriceAlert
     * @example
     * // Get one PriceAlert
     * const priceAlert = await prisma.priceAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceAlertFindUniqueArgs>(args: SelectSubset<T, PriceAlertFindUniqueArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PriceAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceAlertFindUniqueOrThrowArgs} args - Arguments to find a PriceAlert
     * @example
     * // Get one PriceAlert
     * const priceAlert = await prisma.priceAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertFindFirstArgs} args - Arguments to find a PriceAlert
     * @example
     * // Get one PriceAlert
     * const priceAlert = await prisma.priceAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceAlertFindFirstArgs>(args?: SelectSubset<T, PriceAlertFindFirstArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertFindFirstOrThrowArgs} args - Arguments to find a PriceAlert
     * @example
     * // Get one PriceAlert
     * const priceAlert = await prisma.priceAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceAlerts
     * const priceAlerts = await prisma.priceAlert.findMany()
     * 
     * // Get first 10 PriceAlerts
     * const priceAlerts = await prisma.priceAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceAlertWithIdOnly = await prisma.priceAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceAlertFindManyArgs>(args?: SelectSubset<T, PriceAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PriceAlert.
     * @param {PriceAlertCreateArgs} args - Arguments to create a PriceAlert.
     * @example
     * // Create one PriceAlert
     * const PriceAlert = await prisma.priceAlert.create({
     *   data: {
     *     // ... data to create a PriceAlert
     *   }
     * })
     * 
     */
    create<T extends PriceAlertCreateArgs>(args: SelectSubset<T, PriceAlertCreateArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PriceAlerts.
     * @param {PriceAlertCreateManyArgs} args - Arguments to create many PriceAlerts.
     * @example
     * // Create many PriceAlerts
     * const priceAlert = await prisma.priceAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceAlertCreateManyArgs>(args?: SelectSubset<T, PriceAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PriceAlert.
     * @param {PriceAlertDeleteArgs} args - Arguments to delete one PriceAlert.
     * @example
     * // Delete one PriceAlert
     * const PriceAlert = await prisma.priceAlert.delete({
     *   where: {
     *     // ... filter to delete one PriceAlert
     *   }
     * })
     * 
     */
    delete<T extends PriceAlertDeleteArgs>(args: SelectSubset<T, PriceAlertDeleteArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PriceAlert.
     * @param {PriceAlertUpdateArgs} args - Arguments to update one PriceAlert.
     * @example
     * // Update one PriceAlert
     * const priceAlert = await prisma.priceAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceAlertUpdateArgs>(args: SelectSubset<T, PriceAlertUpdateArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PriceAlerts.
     * @param {PriceAlertDeleteManyArgs} args - Arguments to filter PriceAlerts to delete.
     * @example
     * // Delete a few PriceAlerts
     * const { count } = await prisma.priceAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceAlertDeleteManyArgs>(args?: SelectSubset<T, PriceAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceAlerts
     * const priceAlert = await prisma.priceAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceAlertUpdateManyArgs>(args: SelectSubset<T, PriceAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PriceAlert.
     * @param {PriceAlertUpsertArgs} args - Arguments to update or create a PriceAlert.
     * @example
     * // Update or create a PriceAlert
     * const priceAlert = await prisma.priceAlert.upsert({
     *   create: {
     *     // ... data to create a PriceAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceAlert we want to update
     *   }
     * })
     */
    upsert<T extends PriceAlertUpsertArgs>(args: SelectSubset<T, PriceAlertUpsertArgs<ExtArgs>>): Prisma__PriceAlertClient<$Result.GetResult<Prisma.$PriceAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceAlerts that matches the filter.
     * @param {PriceAlertFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const priceAlert = await prisma.priceAlert.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PriceAlertFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PriceAlert.
     * @param {PriceAlertAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const priceAlert = await prisma.priceAlert.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PriceAlertAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PriceAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertCountArgs} args - Arguments to filter PriceAlerts to count.
     * @example
     * // Count the number of PriceAlerts
     * const count = await prisma.priceAlert.count({
     *   where: {
     *     // ... the filter for the PriceAlerts we want to count
     *   }
     * })
    **/
    count<T extends PriceAlertCountArgs>(
      args?: Subset<T, PriceAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceAlertAggregateArgs>(args: Subset<T, PriceAlertAggregateArgs>): Prisma.PrismaPromise<GetPriceAlertAggregateType<T>>

    /**
     * Group by PriceAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceAlertGroupByArgs['orderBy'] }
        : { orderBy?: PriceAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceAlert model
   */
  readonly fields: PriceAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    token<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceAlert model
   */
  interface PriceAlertFieldRefs {
    readonly id: FieldRef<"PriceAlert", 'String'>
    readonly userId: FieldRef<"PriceAlert", 'String'>
    readonly tokenId: FieldRef<"PriceAlert", 'String'>
    readonly targetPrice: FieldRef<"PriceAlert", 'Float'>
    readonly condition: FieldRef<"PriceAlert", 'String'>
    readonly isTriggered: FieldRef<"PriceAlert", 'Boolean'>
    readonly isActive: FieldRef<"PriceAlert", 'Boolean'>
    readonly createdAt: FieldRef<"PriceAlert", 'DateTime'>
    readonly updatedAt: FieldRef<"PriceAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceAlert findUnique
   */
  export type PriceAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter, which PriceAlert to fetch.
     */
    where: PriceAlertWhereUniqueInput
  }

  /**
   * PriceAlert findUniqueOrThrow
   */
  export type PriceAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter, which PriceAlert to fetch.
     */
    where: PriceAlertWhereUniqueInput
  }

  /**
   * PriceAlert findFirst
   */
  export type PriceAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter, which PriceAlert to fetch.
     */
    where?: PriceAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceAlerts to fetch.
     */
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceAlerts.
     */
    cursor?: PriceAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceAlerts.
     */
    distinct?: PriceAlertScalarFieldEnum | PriceAlertScalarFieldEnum[]
  }

  /**
   * PriceAlert findFirstOrThrow
   */
  export type PriceAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter, which PriceAlert to fetch.
     */
    where?: PriceAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceAlerts to fetch.
     */
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceAlerts.
     */
    cursor?: PriceAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceAlerts.
     */
    distinct?: PriceAlertScalarFieldEnum | PriceAlertScalarFieldEnum[]
  }

  /**
   * PriceAlert findMany
   */
  export type PriceAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter, which PriceAlerts to fetch.
     */
    where?: PriceAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceAlerts to fetch.
     */
    orderBy?: PriceAlertOrderByWithRelationInput | PriceAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceAlerts.
     */
    cursor?: PriceAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceAlerts.
     */
    skip?: number
    distinct?: PriceAlertScalarFieldEnum | PriceAlertScalarFieldEnum[]
  }

  /**
   * PriceAlert create
   */
  export type PriceAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceAlert.
     */
    data: XOR<PriceAlertCreateInput, PriceAlertUncheckedCreateInput>
  }

  /**
   * PriceAlert createMany
   */
  export type PriceAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceAlerts.
     */
    data: PriceAlertCreateManyInput | PriceAlertCreateManyInput[]
  }

  /**
   * PriceAlert update
   */
  export type PriceAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceAlert.
     */
    data: XOR<PriceAlertUpdateInput, PriceAlertUncheckedUpdateInput>
    /**
     * Choose, which PriceAlert to update.
     */
    where: PriceAlertWhereUniqueInput
  }

  /**
   * PriceAlert updateMany
   */
  export type PriceAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceAlerts.
     */
    data: XOR<PriceAlertUpdateManyMutationInput, PriceAlertUncheckedUpdateManyInput>
    /**
     * Filter which PriceAlerts to update
     */
    where?: PriceAlertWhereInput
    /**
     * Limit how many PriceAlerts to update.
     */
    limit?: number
  }

  /**
   * PriceAlert upsert
   */
  export type PriceAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceAlert to update in case it exists.
     */
    where: PriceAlertWhereUniqueInput
    /**
     * In case the PriceAlert found by the `where` argument doesn't exist, create a new PriceAlert with this data.
     */
    create: XOR<PriceAlertCreateInput, PriceAlertUncheckedCreateInput>
    /**
     * In case the PriceAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceAlertUpdateInput, PriceAlertUncheckedUpdateInput>
  }

  /**
   * PriceAlert delete
   */
  export type PriceAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
    /**
     * Filter which PriceAlert to delete.
     */
    where: PriceAlertWhereUniqueInput
  }

  /**
   * PriceAlert deleteMany
   */
  export type PriceAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceAlerts to delete
     */
    where?: PriceAlertWhereInput
    /**
     * Limit how many PriceAlerts to delete.
     */
    limit?: number
  }

  /**
   * PriceAlert findRaw
   */
  export type PriceAlertFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PriceAlert aggregateRaw
   */
  export type PriceAlertAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PriceAlert without action
   */
  export type PriceAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceAlert
     */
    select?: PriceAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceAlert
     */
    omit?: PriceAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceAlertInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    telegramId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    telegramId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    telegramId: number | null
    message: string | null
    type: string | null
    referenceId: string | null
    isDelivered: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    telegramId: number | null
    message: string | null
    type: string | null
    referenceId: string | null
    isDelivered: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    telegramId: number
    message: number
    type: number
    referenceId: number
    isDelivered: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    telegramId?: true
  }

  export type NotificationSumAggregateInputType = {
    telegramId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    telegramId?: true
    message?: true
    type?: true
    referenceId?: true
    isDelivered?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    telegramId?: true
    message?: true
    type?: true
    referenceId?: true
    isDelivered?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    telegramId?: true
    message?: true
    type?: true
    referenceId?: true
    isDelivered?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    telegramId: number
    message: string
    type: string
    referenceId: string | null
    isDelivered: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    message?: boolean
    type?: boolean
    referenceId?: boolean
    isDelivered?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    telegramId?: boolean
    message?: boolean
    type?: boolean
    referenceId?: boolean
    isDelivered?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "message" | "type" | "referenceId" | "isDelivered" | "createdAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: number
      message: string
      type: string
      referenceId: string | null
      isDelivered: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * @param {NotificationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const notification = await prisma.notification.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: NotificationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Notification.
     * @param {NotificationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const notification = await prisma.notification.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: NotificationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly telegramId: FieldRef<"Notification", 'Int'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly referenceId: FieldRef<"Notification", 'String'>
    readonly isDelivered: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification findRaw
   */
  export type NotificationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification aggregateRaw
   */
  export type NotificationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model AdminConfig
   */

  export type AggregateAdminConfig = {
    _count: AdminConfigCountAggregateOutputType | null
    _min: AdminConfigMinAggregateOutputType | null
    _max: AdminConfigMaxAggregateOutputType | null
  }

  export type AdminConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AdminConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AdminConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type AdminConfigMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AdminConfigMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AdminConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminConfig to aggregate.
     */
    where?: AdminConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminConfigs to fetch.
     */
    orderBy?: AdminConfigOrderByWithRelationInput | AdminConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminConfigs
    **/
    _count?: true | AdminConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminConfigMaxAggregateInputType
  }

  export type GetAdminConfigAggregateType<T extends AdminConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminConfig[P]>
      : GetScalarType<T[P], AggregateAdminConfig[P]>
  }




  export type AdminConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminConfigWhereInput
    orderBy?: AdminConfigOrderByWithAggregationInput | AdminConfigOrderByWithAggregationInput[]
    by: AdminConfigScalarFieldEnum[] | AdminConfigScalarFieldEnum
    having?: AdminConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminConfigCountAggregateInputType | true
    _min?: AdminConfigMinAggregateInputType
    _max?: AdminConfigMaxAggregateInputType
  }

  export type AdminConfigGroupByOutputType = {
    id: string
    key: string
    value: string
    updatedAt: Date
    _count: AdminConfigCountAggregateOutputType | null
    _min: AdminConfigMinAggregateOutputType | null
    _max: AdminConfigMaxAggregateOutputType | null
  }

  type GetAdminConfigGroupByPayload<T extends AdminConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AdminConfigGroupByOutputType[P]>
        }
      >
    >


  export type AdminConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminConfig"]>



  export type AdminConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type AdminConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "updatedAt", ExtArgs["result"]["adminConfig"]>

  export type $AdminConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["adminConfig"]>
    composites: {}
  }

  type AdminConfigGetPayload<S extends boolean | null | undefined | AdminConfigDefaultArgs> = $Result.GetResult<Prisma.$AdminConfigPayload, S>

  type AdminConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminConfigCountAggregateInputType | true
    }

  export interface AdminConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminConfig'], meta: { name: 'AdminConfig' } }
    /**
     * Find zero or one AdminConfig that matches the filter.
     * @param {AdminConfigFindUniqueArgs} args - Arguments to find a AdminConfig
     * @example
     * // Get one AdminConfig
     * const adminConfig = await prisma.adminConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminConfigFindUniqueArgs>(args: SelectSubset<T, AdminConfigFindUniqueArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminConfigFindUniqueOrThrowArgs} args - Arguments to find a AdminConfig
     * @example
     * // Get one AdminConfig
     * const adminConfig = await prisma.adminConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigFindFirstArgs} args - Arguments to find a AdminConfig
     * @example
     * // Get one AdminConfig
     * const adminConfig = await prisma.adminConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminConfigFindFirstArgs>(args?: SelectSubset<T, AdminConfigFindFirstArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigFindFirstOrThrowArgs} args - Arguments to find a AdminConfig
     * @example
     * // Get one AdminConfig
     * const adminConfig = await prisma.adminConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminConfigs
     * const adminConfigs = await prisma.adminConfig.findMany()
     * 
     * // Get first 10 AdminConfigs
     * const adminConfigs = await prisma.adminConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminConfigWithIdOnly = await prisma.adminConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminConfigFindManyArgs>(args?: SelectSubset<T, AdminConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminConfig.
     * @param {AdminConfigCreateArgs} args - Arguments to create a AdminConfig.
     * @example
     * // Create one AdminConfig
     * const AdminConfig = await prisma.adminConfig.create({
     *   data: {
     *     // ... data to create a AdminConfig
     *   }
     * })
     * 
     */
    create<T extends AdminConfigCreateArgs>(args: SelectSubset<T, AdminConfigCreateArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminConfigs.
     * @param {AdminConfigCreateManyArgs} args - Arguments to create many AdminConfigs.
     * @example
     * // Create many AdminConfigs
     * const adminConfig = await prisma.adminConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminConfigCreateManyArgs>(args?: SelectSubset<T, AdminConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AdminConfig.
     * @param {AdminConfigDeleteArgs} args - Arguments to delete one AdminConfig.
     * @example
     * // Delete one AdminConfig
     * const AdminConfig = await prisma.adminConfig.delete({
     *   where: {
     *     // ... filter to delete one AdminConfig
     *   }
     * })
     * 
     */
    delete<T extends AdminConfigDeleteArgs>(args: SelectSubset<T, AdminConfigDeleteArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminConfig.
     * @param {AdminConfigUpdateArgs} args - Arguments to update one AdminConfig.
     * @example
     * // Update one AdminConfig
     * const adminConfig = await prisma.adminConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminConfigUpdateArgs>(args: SelectSubset<T, AdminConfigUpdateArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminConfigs.
     * @param {AdminConfigDeleteManyArgs} args - Arguments to filter AdminConfigs to delete.
     * @example
     * // Delete a few AdminConfigs
     * const { count } = await prisma.adminConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminConfigDeleteManyArgs>(args?: SelectSubset<T, AdminConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminConfigs
     * const adminConfig = await prisma.adminConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminConfigUpdateManyArgs>(args: SelectSubset<T, AdminConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminConfig.
     * @param {AdminConfigUpsertArgs} args - Arguments to update or create a AdminConfig.
     * @example
     * // Update or create a AdminConfig
     * const adminConfig = await prisma.adminConfig.upsert({
     *   create: {
     *     // ... data to create a AdminConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminConfig we want to update
     *   }
     * })
     */
    upsert<T extends AdminConfigUpsertArgs>(args: SelectSubset<T, AdminConfigUpsertArgs<ExtArgs>>): Prisma__AdminConfigClient<$Result.GetResult<Prisma.$AdminConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminConfigs that matches the filter.
     * @param {AdminConfigFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const adminConfig = await prisma.adminConfig.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AdminConfigFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a AdminConfig.
     * @param {AdminConfigAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const adminConfig = await prisma.adminConfig.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AdminConfigAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of AdminConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigCountArgs} args - Arguments to filter AdminConfigs to count.
     * @example
     * // Count the number of AdminConfigs
     * const count = await prisma.adminConfig.count({
     *   where: {
     *     // ... the filter for the AdminConfigs we want to count
     *   }
     * })
    **/
    count<T extends AdminConfigCountArgs>(
      args?: Subset<T, AdminConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminConfigAggregateArgs>(args: Subset<T, AdminConfigAggregateArgs>): Prisma.PrismaPromise<GetAdminConfigAggregateType<T>>

    /**
     * Group by AdminConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminConfigGroupByArgs['orderBy'] }
        : { orderBy?: AdminConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminConfig model
   */
  readonly fields: AdminConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminConfig model
   */
  interface AdminConfigFieldRefs {
    readonly id: FieldRef<"AdminConfig", 'String'>
    readonly key: FieldRef<"AdminConfig", 'String'>
    readonly value: FieldRef<"AdminConfig", 'String'>
    readonly updatedAt: FieldRef<"AdminConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminConfig findUnique
   */
  export type AdminConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter, which AdminConfig to fetch.
     */
    where: AdminConfigWhereUniqueInput
  }

  /**
   * AdminConfig findUniqueOrThrow
   */
  export type AdminConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter, which AdminConfig to fetch.
     */
    where: AdminConfigWhereUniqueInput
  }

  /**
   * AdminConfig findFirst
   */
  export type AdminConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter, which AdminConfig to fetch.
     */
    where?: AdminConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminConfigs to fetch.
     */
    orderBy?: AdminConfigOrderByWithRelationInput | AdminConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminConfigs.
     */
    cursor?: AdminConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminConfigs.
     */
    distinct?: AdminConfigScalarFieldEnum | AdminConfigScalarFieldEnum[]
  }

  /**
   * AdminConfig findFirstOrThrow
   */
  export type AdminConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter, which AdminConfig to fetch.
     */
    where?: AdminConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminConfigs to fetch.
     */
    orderBy?: AdminConfigOrderByWithRelationInput | AdminConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminConfigs.
     */
    cursor?: AdminConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminConfigs.
     */
    distinct?: AdminConfigScalarFieldEnum | AdminConfigScalarFieldEnum[]
  }

  /**
   * AdminConfig findMany
   */
  export type AdminConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter, which AdminConfigs to fetch.
     */
    where?: AdminConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminConfigs to fetch.
     */
    orderBy?: AdminConfigOrderByWithRelationInput | AdminConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminConfigs.
     */
    cursor?: AdminConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminConfigs.
     */
    skip?: number
    distinct?: AdminConfigScalarFieldEnum | AdminConfigScalarFieldEnum[]
  }

  /**
   * AdminConfig create
   */
  export type AdminConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminConfig.
     */
    data: XOR<AdminConfigCreateInput, AdminConfigUncheckedCreateInput>
  }

  /**
   * AdminConfig createMany
   */
  export type AdminConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminConfigs.
     */
    data: AdminConfigCreateManyInput | AdminConfigCreateManyInput[]
  }

  /**
   * AdminConfig update
   */
  export type AdminConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminConfig.
     */
    data: XOR<AdminConfigUpdateInput, AdminConfigUncheckedUpdateInput>
    /**
     * Choose, which AdminConfig to update.
     */
    where: AdminConfigWhereUniqueInput
  }

  /**
   * AdminConfig updateMany
   */
  export type AdminConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminConfigs.
     */
    data: XOR<AdminConfigUpdateManyMutationInput, AdminConfigUncheckedUpdateManyInput>
    /**
     * Filter which AdminConfigs to update
     */
    where?: AdminConfigWhereInput
    /**
     * Limit how many AdminConfigs to update.
     */
    limit?: number
  }

  /**
   * AdminConfig upsert
   */
  export type AdminConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminConfig to update in case it exists.
     */
    where: AdminConfigWhereUniqueInput
    /**
     * In case the AdminConfig found by the `where` argument doesn't exist, create a new AdminConfig with this data.
     */
    create: XOR<AdminConfigCreateInput, AdminConfigUncheckedCreateInput>
    /**
     * In case the AdminConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminConfigUpdateInput, AdminConfigUncheckedUpdateInput>
  }

  /**
   * AdminConfig delete
   */
  export type AdminConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
    /**
     * Filter which AdminConfig to delete.
     */
    where: AdminConfigWhereUniqueInput
  }

  /**
   * AdminConfig deleteMany
   */
  export type AdminConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminConfigs to delete
     */
    where?: AdminConfigWhereInput
    /**
     * Limit how many AdminConfigs to delete.
     */
    limit?: number
  }

  /**
   * AdminConfig findRaw
   */
  export type AdminConfigFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AdminConfig aggregateRaw
   */
  export type AdminConfigAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * AdminConfig without action
   */
  export type AdminConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminConfig
     */
    select?: AdminConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminConfig
     */
    omit?: AdminConfigOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    firstName: 'firstName',
    language: 'language',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    activityPoints: 'activityPoints'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    address: 'address',
    name: 'name',
    type: 'type',
    isDefault: 'isDefault',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    name: 'name',
    icon: 'icon',
    contractAddress: 'contractAddress',
    decimals: 'decimals',
    network: 'network',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fromTokenId: 'fromTokenId',
    toTokenId: 'toTokenId',
    fromAmount: 'fromAmount',
    toAmount: 'toAmount',
    rate: 'rate',
    status: 'status',
    txHash: 'txHash',
    walletAddress: 'walletAddress',
    slippage: 'slippage',
    gasFee: 'gasFee',
    isSimulated: 'isSimulated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const PriceAlertScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenId: 'tokenId',
    targetPrice: 'targetPrice',
    condition: 'condition',
    isTriggered: 'isTriggered',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceAlertScalarFieldEnum = (typeof PriceAlertScalarFieldEnum)[keyof typeof PriceAlertScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    message: 'message',
    type: 'type',
    referenceId: 'referenceId',
    isDelivered: 'isDelivered',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AdminConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type AdminConfigScalarFieldEnum = (typeof AdminConfigScalarFieldEnum)[keyof typeof AdminConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    telegramId?: IntFilter<"User"> | number
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    language?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activityPoints?: IntFilter<"User"> | number
    wallets?: WalletListRelationFilter
    transactions?: TransactionListRelationFilter
    priceAlerts?: PriceAlertListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityPoints?: SortOrder
    wallets?: WalletOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    priceAlerts?: PriceAlertOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramId?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    language?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activityPoints?: IntFilter<"User"> | number
    wallets?: WalletListRelationFilter
    transactions?: TransactionListRelationFilter
    priceAlerts?: PriceAlertListRelationFilter
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityPoints?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    telegramId?: IntWithAggregatesFilter<"User"> | number
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    language?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    activityPoints?: IntWithAggregatesFilter<"User"> | number
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    name?: StringNullableFilter<"Wallet"> | string | null
    type?: StringFilter<"Wallet"> | string
    isDefault?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_address?: WalletUserIdAddressCompoundUniqueInput
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    address?: StringFilter<"Wallet"> | string
    name?: StringNullableFilter<"Wallet"> | string | null
    type?: StringFilter<"Wallet"> | string
    isDefault?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    address?: StringWithAggregatesFilter<"Wallet"> | string
    name?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    type?: StringWithAggregatesFilter<"Wallet"> | string
    isDefault?: BoolWithAggregatesFilter<"Wallet"> | boolean
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    symbol?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    icon?: StringNullableFilter<"Token"> | string | null
    contractAddress?: StringNullableFilter<"Token"> | string | null
    decimals?: IntFilter<"Token"> | number
    network?: StringFilter<"Token"> | string
    isActive?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    fromTransactions?: TransactionListRelationFilter
    toTransactions?: TransactionListRelationFilter
    priceAlerts?: PriceAlertListRelationFilter
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    contractAddress?: SortOrder
    decimals?: SortOrder
    network?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromTransactions?: TransactionOrderByRelationAggregateInput
    toTransactions?: TransactionOrderByRelationAggregateInput
    priceAlerts?: PriceAlertOrderByRelationAggregateInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    symbol?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    name?: StringFilter<"Token"> | string
    icon?: StringNullableFilter<"Token"> | string | null
    contractAddress?: StringNullableFilter<"Token"> | string | null
    decimals?: IntFilter<"Token"> | number
    network?: StringFilter<"Token"> | string
    isActive?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    fromTransactions?: TransactionListRelationFilter
    toTransactions?: TransactionListRelationFilter
    priceAlerts?: PriceAlertListRelationFilter
  }, "id" | "symbol">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    contractAddress?: SortOrder
    decimals?: SortOrder
    network?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    symbol?: StringWithAggregatesFilter<"Token"> | string
    name?: StringWithAggregatesFilter<"Token"> | string
    icon?: StringNullableWithAggregatesFilter<"Token"> | string | null
    contractAddress?: StringNullableWithAggregatesFilter<"Token"> | string | null
    decimals?: IntWithAggregatesFilter<"Token"> | number
    network?: StringWithAggregatesFilter<"Token"> | string
    isActive?: BoolWithAggregatesFilter<"Token"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    fromTokenId?: StringFilter<"Transaction"> | string
    toTokenId?: StringFilter<"Transaction"> | string
    fromAmount?: StringFilter<"Transaction"> | string
    toAmount?: StringFilter<"Transaction"> | string
    rate?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    walletAddress?: StringFilter<"Transaction"> | string
    slippage?: FloatNullableFilter<"Transaction"> | number | null
    gasFee?: StringNullableFilter<"Transaction"> | string | null
    isSimulated?: BoolFilter<"Transaction"> | boolean
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromToken?: XOR<TokenScalarRelationFilter, TokenWhereInput>
    toToken?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromTokenId?: SortOrder
    toTokenId?: SortOrder
    fromAmount?: SortOrder
    toAmount?: SortOrder
    rate?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    walletAddress?: SortOrder
    slippage?: SortOrder
    gasFee?: SortOrder
    isSimulated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    fromToken?: TokenOrderByWithRelationInput
    toToken?: TokenOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    fromTokenId?: StringFilter<"Transaction"> | string
    toTokenId?: StringFilter<"Transaction"> | string
    fromAmount?: StringFilter<"Transaction"> | string
    toAmount?: StringFilter<"Transaction"> | string
    rate?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    walletAddress?: StringFilter<"Transaction"> | string
    slippage?: FloatNullableFilter<"Transaction"> | number | null
    gasFee?: StringNullableFilter<"Transaction"> | string | null
    isSimulated?: BoolFilter<"Transaction"> | boolean
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    fromToken?: XOR<TokenScalarRelationFilter, TokenWhereInput>
    toToken?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromTokenId?: SortOrder
    toTokenId?: SortOrder
    fromAmount?: SortOrder
    toAmount?: SortOrder
    rate?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    walletAddress?: SortOrder
    slippage?: SortOrder
    gasFee?: SortOrder
    isSimulated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    fromTokenId?: StringWithAggregatesFilter<"Transaction"> | string
    toTokenId?: StringWithAggregatesFilter<"Transaction"> | string
    fromAmount?: StringWithAggregatesFilter<"Transaction"> | string
    toAmount?: StringWithAggregatesFilter<"Transaction"> | string
    rate?: FloatWithAggregatesFilter<"Transaction"> | number
    status?: StringWithAggregatesFilter<"Transaction"> | string
    txHash?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    walletAddress?: StringWithAggregatesFilter<"Transaction"> | string
    slippage?: FloatNullableWithAggregatesFilter<"Transaction"> | number | null
    gasFee?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    isSimulated?: BoolWithAggregatesFilter<"Transaction"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type PriceAlertWhereInput = {
    AND?: PriceAlertWhereInput | PriceAlertWhereInput[]
    OR?: PriceAlertWhereInput[]
    NOT?: PriceAlertWhereInput | PriceAlertWhereInput[]
    id?: StringFilter<"PriceAlert"> | string
    userId?: StringFilter<"PriceAlert"> | string
    tokenId?: StringFilter<"PriceAlert"> | string
    targetPrice?: FloatFilter<"PriceAlert"> | number
    condition?: StringFilter<"PriceAlert"> | string
    isTriggered?: BoolFilter<"PriceAlert"> | boolean
    isActive?: BoolFilter<"PriceAlert"> | boolean
    createdAt?: DateTimeFilter<"PriceAlert"> | Date | string
    updatedAt?: DateTimeFilter<"PriceAlert"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    token?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }

  export type PriceAlertOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    targetPrice?: SortOrder
    condition?: SortOrder
    isTriggered?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    token?: TokenOrderByWithRelationInput
  }

  export type PriceAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriceAlertWhereInput | PriceAlertWhereInput[]
    OR?: PriceAlertWhereInput[]
    NOT?: PriceAlertWhereInput | PriceAlertWhereInput[]
    userId?: StringFilter<"PriceAlert"> | string
    tokenId?: StringFilter<"PriceAlert"> | string
    targetPrice?: FloatFilter<"PriceAlert"> | number
    condition?: StringFilter<"PriceAlert"> | string
    isTriggered?: BoolFilter<"PriceAlert"> | boolean
    isActive?: BoolFilter<"PriceAlert"> | boolean
    createdAt?: DateTimeFilter<"PriceAlert"> | Date | string
    updatedAt?: DateTimeFilter<"PriceAlert"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    token?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }, "id">

  export type PriceAlertOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    targetPrice?: SortOrder
    condition?: SortOrder
    isTriggered?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceAlertCountOrderByAggregateInput
    _avg?: PriceAlertAvgOrderByAggregateInput
    _max?: PriceAlertMaxOrderByAggregateInput
    _min?: PriceAlertMinOrderByAggregateInput
    _sum?: PriceAlertSumOrderByAggregateInput
  }

  export type PriceAlertScalarWhereWithAggregatesInput = {
    AND?: PriceAlertScalarWhereWithAggregatesInput | PriceAlertScalarWhereWithAggregatesInput[]
    OR?: PriceAlertScalarWhereWithAggregatesInput[]
    NOT?: PriceAlertScalarWhereWithAggregatesInput | PriceAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PriceAlert"> | string
    userId?: StringWithAggregatesFilter<"PriceAlert"> | string
    tokenId?: StringWithAggregatesFilter<"PriceAlert"> | string
    targetPrice?: FloatWithAggregatesFilter<"PriceAlert"> | number
    condition?: StringWithAggregatesFilter<"PriceAlert"> | string
    isTriggered?: BoolWithAggregatesFilter<"PriceAlert"> | boolean
    isActive?: BoolWithAggregatesFilter<"PriceAlert"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PriceAlert"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PriceAlert"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    telegramId?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    referenceId?: StringNullableFilter<"Notification"> | string | null
    isDelivered?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    isDelivered?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    telegramId?: IntFilter<"Notification"> | number
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    referenceId?: StringNullableFilter<"Notification"> | string | null
    isDelivered?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    isDelivered?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    telegramId?: IntWithAggregatesFilter<"Notification"> | number
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    referenceId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    isDelivered?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AdminConfigWhereInput = {
    AND?: AdminConfigWhereInput | AdminConfigWhereInput[]
    OR?: AdminConfigWhereInput[]
    NOT?: AdminConfigWhereInput | AdminConfigWhereInput[]
    id?: StringFilter<"AdminConfig"> | string
    key?: StringFilter<"AdminConfig"> | string
    value?: StringFilter<"AdminConfig"> | string
    updatedAt?: DateTimeFilter<"AdminConfig"> | Date | string
  }

  export type AdminConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: AdminConfigWhereInput | AdminConfigWhereInput[]
    OR?: AdminConfigWhereInput[]
    NOT?: AdminConfigWhereInput | AdminConfigWhereInput[]
    value?: StringFilter<"AdminConfig"> | string
    updatedAt?: DateTimeFilter<"AdminConfig"> | Date | string
  }, "id" | "key">

  export type AdminConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminConfigCountOrderByAggregateInput
    _max?: AdminConfigMaxOrderByAggregateInput
    _min?: AdminConfigMinOrderByAggregateInput
  }

  export type AdminConfigScalarWhereWithAggregatesInput = {
    AND?: AdminConfigScalarWhereWithAggregatesInput | AdminConfigScalarWhereWithAggregatesInput[]
    OR?: AdminConfigScalarWhereWithAggregatesInput[]
    NOT?: AdminConfigScalarWhereWithAggregatesInput | AdminConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminConfig"> | string
    key?: StringWithAggregatesFilter<"AdminConfig"> | string
    value?: StringWithAggregatesFilter<"AdminConfig"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminConfig"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
  }

  export type UserUpdateManyMutationInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
  }

  export type WalletCreateInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateManyInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionCreateNestedManyWithoutFromTokenInput
    toTransactions?: TransactionCreateNestedManyWithoutToTokenInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionUncheckedCreateNestedManyWithoutFromTokenInput
    toTransactions?: TransactionUncheckedCreateNestedManyWithoutToTokenInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenUpdateInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUpdateManyWithoutFromTokenNestedInput
    toTransactions?: TransactionUpdateManyWithoutToTokenNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUncheckedUpdateManyWithoutFromTokenNestedInput
    toTransactions?: TransactionUncheckedUpdateManyWithoutToTokenNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenCreateManyInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    fromToken: TokenCreateNestedOneWithoutFromTransactionsInput
    toToken: TokenCreateNestedOneWithoutToTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    fromTokenId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    fromToken?: TokenUpdateOneRequiredWithoutFromTransactionsNestedInput
    toToken?: TokenUpdateOneRequiredWithoutToTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    fromTokenId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    fromTokenId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    fromTokenId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertCreateInput = {
    id?: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPriceAlertsInput
    token: TokenCreateNestedOneWithoutPriceAlertsInput
  }

  export type PriceAlertUncheckedCreateInput = {
    id?: string
    userId: string
    tokenId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertUpdateInput = {
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPriceAlertsNestedInput
    token?: TokenUpdateOneRequiredWithoutPriceAlertsNestedInput
  }

  export type PriceAlertUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertCreateManyInput = {
    id?: string
    userId: string
    tokenId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertUpdateManyMutationInput = {
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    tokenId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    telegramId: number
    message: string
    type: string
    referenceId?: string | null
    isDelivered?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    telegramId: number
    message: string
    type: string
    referenceId?: string | null
    isDelivered?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDelivered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDelivered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    telegramId: number
    message: string
    type: string
    referenceId?: string | null
    isDelivered?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDelivered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDelivered?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminConfigCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AdminConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AdminConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminConfigCreateManyInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AdminConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type PriceAlertListRelationFilter = {
    every?: PriceAlertWhereInput
    some?: PriceAlertWhereInput
    none?: PriceAlertWhereInput
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceAlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityPoints?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    telegramId?: SortOrder
    activityPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityPoints?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    firstName?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityPoints?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    telegramId?: SortOrder
    activityPoints?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WalletUserIdAddressCompoundUniqueInput = {
    userId: string
    address: string
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    contractAddress?: SortOrder
    decimals?: SortOrder
    network?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    decimals?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    contractAddress?: SortOrder
    decimals?: SortOrder
    network?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    contractAddress?: SortOrder
    decimals?: SortOrder
    network?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    decimals?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type TokenScalarRelationFilter = {
    is?: TokenWhereInput
    isNot?: TokenWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromTokenId?: SortOrder
    toTokenId?: SortOrder
    fromAmount?: SortOrder
    toAmount?: SortOrder
    rate?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    walletAddress?: SortOrder
    slippage?: SortOrder
    gasFee?: SortOrder
    isSimulated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    rate?: SortOrder
    slippage?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromTokenId?: SortOrder
    toTokenId?: SortOrder
    fromAmount?: SortOrder
    toAmount?: SortOrder
    rate?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    walletAddress?: SortOrder
    slippage?: SortOrder
    gasFee?: SortOrder
    isSimulated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromTokenId?: SortOrder
    toTokenId?: SortOrder
    fromAmount?: SortOrder
    toAmount?: SortOrder
    rate?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    walletAddress?: SortOrder
    slippage?: SortOrder
    gasFee?: SortOrder
    isSimulated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    rate?: SortOrder
    slippage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type PriceAlertCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    targetPrice?: SortOrder
    condition?: SortOrder
    isTriggered?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceAlertAvgOrderByAggregateInput = {
    targetPrice?: SortOrder
  }

  export type PriceAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    targetPrice?: SortOrder
    condition?: SortOrder
    isTriggered?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceAlertMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenId?: SortOrder
    targetPrice?: SortOrder
    condition?: SortOrder
    isTriggered?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceAlertSumOrderByAggregateInput = {
    targetPrice?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    isDelivered?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    telegramId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    isDelivered?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    message?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    isDelivered?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    telegramId?: SortOrder
  }

  export type AdminConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PriceAlertCreateNestedManyWithoutUserInput = {
    create?: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput> | PriceAlertCreateWithoutUserInput[] | PriceAlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutUserInput | PriceAlertCreateOrConnectWithoutUserInput[]
    createMany?: PriceAlertCreateManyUserInputEnvelope
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PriceAlertUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput> | PriceAlertCreateWithoutUserInput[] | PriceAlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutUserInput | PriceAlertCreateOrConnectWithoutUserInput[]
    createMany?: PriceAlertCreateManyUserInputEnvelope
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PriceAlertUpdateManyWithoutUserNestedInput = {
    create?: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput> | PriceAlertCreateWithoutUserInput[] | PriceAlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutUserInput | PriceAlertCreateOrConnectWithoutUserInput[]
    upsert?: PriceAlertUpsertWithWhereUniqueWithoutUserInput | PriceAlertUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PriceAlertCreateManyUserInputEnvelope
    set?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    disconnect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    delete?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    update?: PriceAlertUpdateWithWhereUniqueWithoutUserInput | PriceAlertUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PriceAlertUpdateManyWithWhereWithoutUserInput | PriceAlertUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PriceAlertUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput> | PriceAlertCreateWithoutUserInput[] | PriceAlertUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutUserInput | PriceAlertCreateOrConnectWithoutUserInput[]
    upsert?: PriceAlertUpsertWithWhereUniqueWithoutUserInput | PriceAlertUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PriceAlertCreateManyUserInputEnvelope
    set?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    disconnect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    delete?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    update?: PriceAlertUpdateWithWhereUniqueWithoutUserInput | PriceAlertUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PriceAlertUpdateManyWithWhereWithoutUserInput | PriceAlertUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type TransactionCreateNestedManyWithoutFromTokenInput = {
    create?: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput> | TransactionCreateWithoutFromTokenInput[] | TransactionUncheckedCreateWithoutFromTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFromTokenInput | TransactionCreateOrConnectWithoutFromTokenInput[]
    createMany?: TransactionCreateManyFromTokenInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutToTokenInput = {
    create?: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput> | TransactionCreateWithoutToTokenInput[] | TransactionUncheckedCreateWithoutToTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutToTokenInput | TransactionCreateOrConnectWithoutToTokenInput[]
    createMany?: TransactionCreateManyToTokenInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PriceAlertCreateNestedManyWithoutTokenInput = {
    create?: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput> | PriceAlertCreateWithoutTokenInput[] | PriceAlertUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutTokenInput | PriceAlertCreateOrConnectWithoutTokenInput[]
    createMany?: PriceAlertCreateManyTokenInputEnvelope
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutFromTokenInput = {
    create?: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput> | TransactionCreateWithoutFromTokenInput[] | TransactionUncheckedCreateWithoutFromTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFromTokenInput | TransactionCreateOrConnectWithoutFromTokenInput[]
    createMany?: TransactionCreateManyFromTokenInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutToTokenInput = {
    create?: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput> | TransactionCreateWithoutToTokenInput[] | TransactionUncheckedCreateWithoutToTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutToTokenInput | TransactionCreateOrConnectWithoutToTokenInput[]
    createMany?: TransactionCreateManyToTokenInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PriceAlertUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput> | PriceAlertCreateWithoutTokenInput[] | PriceAlertUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutTokenInput | PriceAlertCreateOrConnectWithoutTokenInput[]
    createMany?: PriceAlertCreateManyTokenInputEnvelope
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
  }

  export type TransactionUpdateManyWithoutFromTokenNestedInput = {
    create?: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput> | TransactionCreateWithoutFromTokenInput[] | TransactionUncheckedCreateWithoutFromTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFromTokenInput | TransactionCreateOrConnectWithoutFromTokenInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutFromTokenInput | TransactionUpsertWithWhereUniqueWithoutFromTokenInput[]
    createMany?: TransactionCreateManyFromTokenInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutFromTokenInput | TransactionUpdateWithWhereUniqueWithoutFromTokenInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutFromTokenInput | TransactionUpdateManyWithWhereWithoutFromTokenInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutToTokenNestedInput = {
    create?: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput> | TransactionCreateWithoutToTokenInput[] | TransactionUncheckedCreateWithoutToTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutToTokenInput | TransactionCreateOrConnectWithoutToTokenInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutToTokenInput | TransactionUpsertWithWhereUniqueWithoutToTokenInput[]
    createMany?: TransactionCreateManyToTokenInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutToTokenInput | TransactionUpdateWithWhereUniqueWithoutToTokenInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutToTokenInput | TransactionUpdateManyWithWhereWithoutToTokenInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PriceAlertUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput> | PriceAlertCreateWithoutTokenInput[] | PriceAlertUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutTokenInput | PriceAlertCreateOrConnectWithoutTokenInput[]
    upsert?: PriceAlertUpsertWithWhereUniqueWithoutTokenInput | PriceAlertUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PriceAlertCreateManyTokenInputEnvelope
    set?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    disconnect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    delete?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    update?: PriceAlertUpdateWithWhereUniqueWithoutTokenInput | PriceAlertUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PriceAlertUpdateManyWithWhereWithoutTokenInput | PriceAlertUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutFromTokenNestedInput = {
    create?: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput> | TransactionCreateWithoutFromTokenInput[] | TransactionUncheckedCreateWithoutFromTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutFromTokenInput | TransactionCreateOrConnectWithoutFromTokenInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutFromTokenInput | TransactionUpsertWithWhereUniqueWithoutFromTokenInput[]
    createMany?: TransactionCreateManyFromTokenInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutFromTokenInput | TransactionUpdateWithWhereUniqueWithoutFromTokenInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutFromTokenInput | TransactionUpdateManyWithWhereWithoutFromTokenInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutToTokenNestedInput = {
    create?: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput> | TransactionCreateWithoutToTokenInput[] | TransactionUncheckedCreateWithoutToTokenInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutToTokenInput | TransactionCreateOrConnectWithoutToTokenInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutToTokenInput | TransactionUpsertWithWhereUniqueWithoutToTokenInput[]
    createMany?: TransactionCreateManyToTokenInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutToTokenInput | TransactionUpdateWithWhereUniqueWithoutToTokenInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutToTokenInput | TransactionUpdateManyWithWhereWithoutToTokenInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PriceAlertUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput> | PriceAlertCreateWithoutTokenInput[] | PriceAlertUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PriceAlertCreateOrConnectWithoutTokenInput | PriceAlertCreateOrConnectWithoutTokenInput[]
    upsert?: PriceAlertUpsertWithWhereUniqueWithoutTokenInput | PriceAlertUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PriceAlertCreateManyTokenInputEnvelope
    set?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    disconnect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    delete?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    connect?: PriceAlertWhereUniqueInput | PriceAlertWhereUniqueInput[]
    update?: PriceAlertUpdateWithWhereUniqueWithoutTokenInput | PriceAlertUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PriceAlertUpdateManyWithWhereWithoutTokenInput | PriceAlertUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutFromTransactionsInput = {
    create?: XOR<TokenCreateWithoutFromTransactionsInput, TokenUncheckedCreateWithoutFromTransactionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFromTransactionsInput
    connect?: TokenWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutToTransactionsInput = {
    create?: XOR<TokenCreateWithoutToTransactionsInput, TokenUncheckedCreateWithoutToTransactionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutToTransactionsInput
    connect?: TokenWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type TokenUpdateOneRequiredWithoutFromTransactionsNestedInput = {
    create?: XOR<TokenCreateWithoutFromTransactionsInput, TokenUncheckedCreateWithoutFromTransactionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFromTransactionsInput
    upsert?: TokenUpsertWithoutFromTransactionsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutFromTransactionsInput, TokenUpdateWithoutFromTransactionsInput>, TokenUncheckedUpdateWithoutFromTransactionsInput>
  }

  export type TokenUpdateOneRequiredWithoutToTransactionsNestedInput = {
    create?: XOR<TokenCreateWithoutToTransactionsInput, TokenUncheckedCreateWithoutToTransactionsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutToTransactionsInput
    upsert?: TokenUpsertWithoutToTransactionsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutToTransactionsInput, TokenUpdateWithoutToTransactionsInput>, TokenUncheckedUpdateWithoutToTransactionsInput>
  }

  export type UserCreateNestedOneWithoutPriceAlertsInput = {
    create?: XOR<UserCreateWithoutPriceAlertsInput, UserUncheckedCreateWithoutPriceAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPriceAlertsInput
    connect?: UserWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutPriceAlertsInput = {
    create?: XOR<TokenCreateWithoutPriceAlertsInput, TokenUncheckedCreateWithoutPriceAlertsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutPriceAlertsInput
    connect?: TokenWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPriceAlertsNestedInput = {
    create?: XOR<UserCreateWithoutPriceAlertsInput, UserUncheckedCreateWithoutPriceAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPriceAlertsInput
    upsert?: UserUpsertWithoutPriceAlertsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPriceAlertsInput, UserUpdateWithoutPriceAlertsInput>, UserUncheckedUpdateWithoutPriceAlertsInput>
  }

  export type TokenUpdateOneRequiredWithoutPriceAlertsNestedInput = {
    create?: XOR<TokenCreateWithoutPriceAlertsInput, TokenUncheckedCreateWithoutPriceAlertsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutPriceAlertsInput
    upsert?: TokenUpsertWithoutPriceAlertsInput
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutPriceAlertsInput, TokenUpdateWithoutPriceAlertsInput>, TokenUncheckedUpdateWithoutPriceAlertsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromToken: TokenCreateNestedOneWithoutFromTransactionsInput
    toToken: TokenCreateNestedOneWithoutToTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    fromTokenId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
  }

  export type PriceAlertCreateWithoutUserInput = {
    id?: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    token: TokenCreateNestedOneWithoutPriceAlertsInput
  }

  export type PriceAlertUncheckedCreateWithoutUserInput = {
    id?: string
    tokenId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertCreateOrConnectWithoutUserInput = {
    where: PriceAlertWhereUniqueInput
    create: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput>
  }

  export type PriceAlertCreateManyUserInputEnvelope = {
    data: PriceAlertCreateManyUserInput | PriceAlertCreateManyUserInput[]
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    id?: StringFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    name?: StringNullableFilter<"Wallet"> | string | null
    type?: StringFilter<"Wallet"> | string
    isDefault?: BoolFilter<"Wallet"> | boolean
    userId?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    fromTokenId?: StringFilter<"Transaction"> | string
    toTokenId?: StringFilter<"Transaction"> | string
    fromAmount?: StringFilter<"Transaction"> | string
    toAmount?: StringFilter<"Transaction"> | string
    rate?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    txHash?: StringNullableFilter<"Transaction"> | string | null
    walletAddress?: StringFilter<"Transaction"> | string
    slippage?: FloatNullableFilter<"Transaction"> | number | null
    gasFee?: StringNullableFilter<"Transaction"> | string | null
    isSimulated?: BoolFilter<"Transaction"> | boolean
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type PriceAlertUpsertWithWhereUniqueWithoutUserInput = {
    where: PriceAlertWhereUniqueInput
    update: XOR<PriceAlertUpdateWithoutUserInput, PriceAlertUncheckedUpdateWithoutUserInput>
    create: XOR<PriceAlertCreateWithoutUserInput, PriceAlertUncheckedCreateWithoutUserInput>
  }

  export type PriceAlertUpdateWithWhereUniqueWithoutUserInput = {
    where: PriceAlertWhereUniqueInput
    data: XOR<PriceAlertUpdateWithoutUserInput, PriceAlertUncheckedUpdateWithoutUserInput>
  }

  export type PriceAlertUpdateManyWithWhereWithoutUserInput = {
    where: PriceAlertScalarWhereInput
    data: XOR<PriceAlertUpdateManyMutationInput, PriceAlertUncheckedUpdateManyWithoutUserInput>
  }

  export type PriceAlertScalarWhereInput = {
    AND?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
    OR?: PriceAlertScalarWhereInput[]
    NOT?: PriceAlertScalarWhereInput | PriceAlertScalarWhereInput[]
    id?: StringFilter<"PriceAlert"> | string
    userId?: StringFilter<"PriceAlert"> | string
    tokenId?: StringFilter<"PriceAlert"> | string
    targetPrice?: FloatFilter<"PriceAlert"> | number
    condition?: StringFilter<"PriceAlert"> | string
    isTriggered?: BoolFilter<"PriceAlert"> | boolean
    isActive?: BoolFilter<"PriceAlert"> | boolean
    createdAt?: DateTimeFilter<"PriceAlert"> | Date | string
    updatedAt?: DateTimeFilter<"PriceAlert"> | Date | string
  }

  export type UserCreateWithoutWalletsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    transactions?: TransactionCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionCreateWithoutFromTokenInput = {
    id?: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    toToken: TokenCreateNestedOneWithoutToTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutFromTokenInput = {
    id?: string
    userId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutFromTokenInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput>
  }

  export type TransactionCreateManyFromTokenInputEnvelope = {
    data: TransactionCreateManyFromTokenInput | TransactionCreateManyFromTokenInput[]
  }

  export type TransactionCreateWithoutToTokenInput = {
    id?: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    fromToken: TokenCreateNestedOneWithoutFromTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutToTokenInput = {
    id?: string
    userId: string
    fromTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutToTokenInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput>
  }

  export type TransactionCreateManyToTokenInputEnvelope = {
    data: TransactionCreateManyToTokenInput | TransactionCreateManyToTokenInput[]
  }

  export type PriceAlertCreateWithoutTokenInput = {
    id?: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPriceAlertsInput
  }

  export type PriceAlertUncheckedCreateWithoutTokenInput = {
    id?: string
    userId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertCreateOrConnectWithoutTokenInput = {
    where: PriceAlertWhereUniqueInput
    create: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput>
  }

  export type PriceAlertCreateManyTokenInputEnvelope = {
    data: PriceAlertCreateManyTokenInput | PriceAlertCreateManyTokenInput[]
  }

  export type TransactionUpsertWithWhereUniqueWithoutFromTokenInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutFromTokenInput, TransactionUncheckedUpdateWithoutFromTokenInput>
    create: XOR<TransactionCreateWithoutFromTokenInput, TransactionUncheckedCreateWithoutFromTokenInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutFromTokenInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutFromTokenInput, TransactionUncheckedUpdateWithoutFromTokenInput>
  }

  export type TransactionUpdateManyWithWhereWithoutFromTokenInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutFromTokenInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutToTokenInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutToTokenInput, TransactionUncheckedUpdateWithoutToTokenInput>
    create: XOR<TransactionCreateWithoutToTokenInput, TransactionUncheckedCreateWithoutToTokenInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutToTokenInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutToTokenInput, TransactionUncheckedUpdateWithoutToTokenInput>
  }

  export type TransactionUpdateManyWithWhereWithoutToTokenInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutToTokenInput>
  }

  export type PriceAlertUpsertWithWhereUniqueWithoutTokenInput = {
    where: PriceAlertWhereUniqueInput
    update: XOR<PriceAlertUpdateWithoutTokenInput, PriceAlertUncheckedUpdateWithoutTokenInput>
    create: XOR<PriceAlertCreateWithoutTokenInput, PriceAlertUncheckedCreateWithoutTokenInput>
  }

  export type PriceAlertUpdateWithWhereUniqueWithoutTokenInput = {
    where: PriceAlertWhereUniqueInput
    data: XOR<PriceAlertUpdateWithoutTokenInput, PriceAlertUncheckedUpdateWithoutTokenInput>
  }

  export type PriceAlertUpdateManyWithWhereWithoutTokenInput = {
    where: PriceAlertScalarWhereInput
    data: XOR<PriceAlertUpdateManyMutationInput, PriceAlertUncheckedUpdateManyWithoutTokenInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type TokenCreateWithoutFromTransactionsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    toTransactions?: TransactionCreateNestedManyWithoutToTokenInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutFromTransactionsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    toTransactions?: TransactionUncheckedCreateNestedManyWithoutToTokenInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutFromTransactionsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutFromTransactionsInput, TokenUncheckedCreateWithoutFromTransactionsInput>
  }

  export type TokenCreateWithoutToTransactionsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionCreateNestedManyWithoutFromTokenInput
    priceAlerts?: PriceAlertCreateNestedManyWithoutTokenInput
  }

  export type TokenUncheckedCreateWithoutToTransactionsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionUncheckedCreateNestedManyWithoutFromTokenInput
    priceAlerts?: PriceAlertUncheckedCreateNestedManyWithoutTokenInput
  }

  export type TokenCreateOrConnectWithoutToTransactionsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutToTransactionsInput, TokenUncheckedCreateWithoutToTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenUpsertWithoutFromTransactionsInput = {
    update: XOR<TokenUpdateWithoutFromTransactionsInput, TokenUncheckedUpdateWithoutFromTransactionsInput>
    create: XOR<TokenCreateWithoutFromTransactionsInput, TokenUncheckedCreateWithoutFromTransactionsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutFromTransactionsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutFromTransactionsInput, TokenUncheckedUpdateWithoutFromTransactionsInput>
  }

  export type TokenUpdateWithoutFromTransactionsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toTransactions?: TransactionUpdateManyWithoutToTokenNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutFromTransactionsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toTransactions?: TransactionUncheckedUpdateManyWithoutToTokenNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type TokenUpsertWithoutToTransactionsInput = {
    update: XOR<TokenUpdateWithoutToTransactionsInput, TokenUncheckedUpdateWithoutToTransactionsInput>
    create: XOR<TokenCreateWithoutToTransactionsInput, TokenUncheckedCreateWithoutToTransactionsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutToTransactionsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutToTransactionsInput, TokenUncheckedUpdateWithoutToTransactionsInput>
  }

  export type TokenUpdateWithoutToTransactionsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUpdateManyWithoutFromTokenNestedInput
    priceAlerts?: PriceAlertUpdateManyWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutToTransactionsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUncheckedUpdateManyWithoutFromTokenNestedInput
    priceAlerts?: PriceAlertUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type UserCreateWithoutPriceAlertsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPriceAlertsInput = {
    id?: string
    telegramId: number
    username?: string | null
    firstName?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityPoints?: number
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPriceAlertsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPriceAlertsInput, UserUncheckedCreateWithoutPriceAlertsInput>
  }

  export type TokenCreateWithoutPriceAlertsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionCreateNestedManyWithoutFromTokenInput
    toTransactions?: TransactionCreateNestedManyWithoutToTokenInput
  }

  export type TokenUncheckedCreateWithoutPriceAlertsInput = {
    id?: string
    symbol: string
    name: string
    icon?: string | null
    contractAddress?: string | null
    decimals?: number
    network: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromTransactions?: TransactionUncheckedCreateNestedManyWithoutFromTokenInput
    toTransactions?: TransactionUncheckedCreateNestedManyWithoutToTokenInput
  }

  export type TokenCreateOrConnectWithoutPriceAlertsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutPriceAlertsInput, TokenUncheckedCreateWithoutPriceAlertsInput>
  }

  export type UserUpsertWithoutPriceAlertsInput = {
    update: XOR<UserUpdateWithoutPriceAlertsInput, UserUncheckedUpdateWithoutPriceAlertsInput>
    create: XOR<UserCreateWithoutPriceAlertsInput, UserUncheckedCreateWithoutPriceAlertsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPriceAlertsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPriceAlertsInput, UserUncheckedUpdateWithoutPriceAlertsInput>
  }

  export type UserUpdateWithoutPriceAlertsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPriceAlertsInput = {
    telegramId?: IntFieldUpdateOperationsInput | number
    username?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityPoints?: IntFieldUpdateOperationsInput | number
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TokenUpsertWithoutPriceAlertsInput = {
    update: XOR<TokenUpdateWithoutPriceAlertsInput, TokenUncheckedUpdateWithoutPriceAlertsInput>
    create: XOR<TokenCreateWithoutPriceAlertsInput, TokenUncheckedCreateWithoutPriceAlertsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutPriceAlertsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutPriceAlertsInput, TokenUncheckedUpdateWithoutPriceAlertsInput>
  }

  export type TokenUpdateWithoutPriceAlertsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUpdateManyWithoutFromTokenNestedInput
    toTransactions?: TransactionUpdateManyWithoutToTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutPriceAlertsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    decimals?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromTransactions?: TransactionUncheckedUpdateManyWithoutFromTokenNestedInput
    toTransactions?: TransactionUncheckedUpdateManyWithoutToTokenNestedInput
  }

  export type WalletCreateManyUserInput = {
    id?: string
    address: string
    name?: string | null
    type: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    fromTokenId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertCreateManyUserInput = {
    id?: string
    tokenId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutUserInput = {
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromToken?: TokenUpdateOneRequiredWithoutFromTransactionsNestedInput
    toToken?: TokenUpdateOneRequiredWithoutToTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    fromTokenId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    fromTokenId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertUpdateWithoutUserInput = {
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneRequiredWithoutPriceAlertsNestedInput
  }

  export type PriceAlertUncheckedUpdateWithoutUserInput = {
    tokenId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertUncheckedUpdateManyWithoutUserInput = {
    tokenId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyFromTokenInput = {
    id?: string
    userId: string
    toTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyToTokenInput = {
    id?: string
    userId: string
    fromTokenId: string
    fromAmount: string
    toAmount: string
    rate: number
    status: string
    txHash?: string | null
    walletAddress: string
    slippage?: number | null
    gasFee?: string | null
    isSimulated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceAlertCreateManyTokenInput = {
    id?: string
    userId: string
    targetPrice: number
    condition: string
    isTriggered?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutFromTokenInput = {
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    toToken?: TokenUpdateOneRequiredWithoutToTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutFromTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutFromTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    toTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutToTokenInput = {
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    fromToken?: TokenUpdateOneRequiredWithoutFromTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutToTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    fromTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutToTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    fromTokenId?: StringFieldUpdateOperationsInput | string
    fromAmount?: StringFieldUpdateOperationsInput | string
    toAmount?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: StringFieldUpdateOperationsInput | string
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    gasFee?: NullableStringFieldUpdateOperationsInput | string | null
    isSimulated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertUpdateWithoutTokenInput = {
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPriceAlertsNestedInput
  }

  export type PriceAlertUncheckedUpdateWithoutTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceAlertUncheckedUpdateManyWithoutTokenInput = {
    userId?: StringFieldUpdateOperationsInput | string
    targetPrice?: FloatFieldUpdateOperationsInput | number
    condition?: StringFieldUpdateOperationsInput | string
    isTriggered?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}