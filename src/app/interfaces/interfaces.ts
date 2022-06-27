export interface Congregation {
  _id: String;
  name: String;
}
export interface User {
  congregationId: String;
  congregationName: String;
  _id?: String;
  name: String;
  email: String;
  password: String;
  phone: String;
  role: String;
  year?: Registry;
}

export interface SuperUser {
  _id?: String;
  name: String;
  email: String;
  password: String;
  role: String;
}

export interface Registry {
  year: String;
  month: String;
  reported?: boolean;
    day: string;
    hours: number;
    publications: number;
    videos: number;
    revisits: number;
    studies: number;
}
