type HttpResponse<Data extends object = { status: string }> = {
  statusCode: number;
  data: Data;
};
