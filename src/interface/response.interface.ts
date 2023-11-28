interface ResponseInterface {
  success: boolean;
  data?: Object;
  error?: Object[];
  message: string;
  status?: number;
}

type OResponse =
  | {
      success: true;
      data: Object;
      message: string;
    }
  | {
      success: false;
      error: Object[];
      message: string;
    };
