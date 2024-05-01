export interface CommonResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ResponseWithId {
  _id?: string;
}
