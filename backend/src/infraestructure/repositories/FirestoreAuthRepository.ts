import admin from "firebase-admin";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class FirestoreAuthRepository implements AuthRepository {
  private collectionRef = admin.firestore().collection("users");

  async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collectionRef.where("email", "==", email).get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      email: data.email,
    };
  }

  async createUser(email: string): Promise<User> {
    const docRef = await this.collectionRef.add({ email });
    return {
      id: docRef.id,
      email,
    };
  }
}
