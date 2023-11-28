export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
export interface TypedRequestParams<T> extends Express.Request {
  params: T;
}
export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}

export interface IPayload {
  userId?: string;
}

export interface AuthRequest<Body = {}, Query = {}, Params = {}>
  extends Express.Request {
  user?: IPayload;
  headers?: {
    authorization?: string;
  };
  body?: Body;
  query?: Query;
  params?: Params;
  url?: string;
}
