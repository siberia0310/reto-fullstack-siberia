import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/interfaces/TaskRepository";
import { db } from "../../utils/firebase";

export class FirestoreTaskRepository implements TaskRepository {
  private collectionRef = db.collection("tasks");

  async getAll(): Promise<Task[]> {
    const snapshot = await this.collectionRef.get();

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      if (!data) throw new Error("Task data is undefined");

      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        createdAt: this.parseDate(data.createdAt),
      };
    });
  }

  async getById(id: string): Promise<Task | null> {
    const docRef = this.collectionRef.doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) return null;

    const data = docSnap.data();
    if (!data) return null;

    return {
      id: docSnap.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: this.parseDate(data.createdAt),
    };
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const now = new Date();
    const docRef = await this.collectionRef.add({
      ...task,
      createdAt: now.toISOString(),
    });

    return {
      id: docRef.id,
      ...task,
      createdAt: now,
    };
  }

  async update(id: string, updates: Partial<Omit<Task, "id">>): Promise<Task> {
    const docRef = this.collectionRef.doc(id);
    await docRef.update(updates);

    const updatedSnap = await docRef.get();
    const data = updatedSnap.data();
    if (!data) throw new Error("Updated task data is undefined");

    return {
      id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: this.parseDate(data.createdAt),
    };
  }

  async delete(id: string): Promise<void> {
    await this.collectionRef.doc(id).delete();
  }

  private parseDate(dateInput: any): Date {
    if (!dateInput) return new Date();
    if (typeof dateInput.toDate === "function") return dateInput.toDate();
    return new Date(dateInput);
  }
}
