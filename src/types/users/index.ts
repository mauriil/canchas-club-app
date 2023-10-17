export interface UserResp {
  userName: string;
  userId: string;
}
export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  mercadoPagoToken: string;
}
export interface LogInUser {
  email: string;
  password: string;
}
export interface LoginResponse {
  name: string;
  id: string;
  statusCode: number;
  message: string[];
  status: number;
}
export interface SigningResponse {
  name: string;
  id: string;
  statusCode: number;
  message: string[];
  status: number;
}
export interface ForgotPasswordRequestBody {
  email: string;
}
export interface ForgotPasswordResponse {
  statusCode: number;
  message: string[];
  status: number;
}

export interface ForgotPasswordBody {
  email: string;
}

export interface PlanStatus {
  date: string;
  type: string;
  clubsCreated: number;
  remainingClubCreations: number;
  fieldsCreated: number;
  remainingFieldCreations: number;
  status: string;
  value: number;
}

export interface EditUser {
  name?: string;
  password?: string;
  phone?: string;
  mercadoPagoToken?: string;
}