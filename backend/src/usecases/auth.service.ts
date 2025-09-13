import admin from "firebase-admin";
import { AuthRepository } from "../domain/interfaces/AuthRepository";
import { User } from "../domain/entities/User";

export class AuthService {
  static getUserByEmail(email: string) {
    throw new Error("Method not implemented.");
  }

  constructor(private authRepository: AuthRepository) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.authRepository.getUserByEmail(email);
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error("Error verifying token:", error);
      throw new Error("Invalid or expired token");
    }
  }

  async createUser(email: string): Promise<User> {
    return this.authRepository.createUser(email);
  }
}
