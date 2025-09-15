import { User } from "../entities/User";

export interface AuthRepository {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(email: string): Promise<User>;
}
