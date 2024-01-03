enum gender {
  M = "M",
  F = "F",
}

export interface IUser {
  avatar: string;
  name: string;
  phoneNo: number;
  email: string;
  password?: string;
  skills: [string];
  address: string;
  gender: gender;
  institution: string;
}

export interface ILogin {
  email: string;
  password: string;
}
