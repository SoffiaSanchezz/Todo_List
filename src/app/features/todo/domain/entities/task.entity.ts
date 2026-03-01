export enum TaskStatus {
  NEW = 'nueva',
  SCHEDULED = 'programada',
  IN_PROGRESS = 'en_progreso',
  COMPLETED = 'completada',
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
