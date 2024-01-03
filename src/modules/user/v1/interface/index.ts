enum gender {
  M = "M",
  F = "F",
}

export interface IUser {
  name: string;
  phoneNo: number;
  email: string;
  password?: string;
  skills: [string];
  // address: string;
  // gender: gender;
}

export interface ILogin {
  email: string;
  password: string;
}
