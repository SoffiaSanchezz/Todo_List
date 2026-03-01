import { Timestamp } from '@angular/fire/firestore';

export enum TaskStatus {
  NEW = 'NEW',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: string;
  categoryId?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
