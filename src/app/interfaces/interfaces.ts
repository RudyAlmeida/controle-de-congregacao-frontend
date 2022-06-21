export interface Congregation {
  _id: String,
  name: String
}
export interface User {
  congregationId: String,
  congregationName: String,
  _id?: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String
}

export interface SuperUser {
  _id?: String,
  name: String,
  email: String,
  password: String,
  role: String
}
