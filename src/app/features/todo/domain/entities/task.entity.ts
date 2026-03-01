export enum TaskStatus {
  NEW = 'new',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId?: string; // Optional: Link to a Category
  completed: boolean; // Flag for completed status
  createdAt: Date;
  updatedAt: Date;
}
