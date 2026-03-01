// src/app / interfaces / task.interface.ts
import { Timestamp } from '@angular/fire/firestore';

export enum TaskStatus {
    NEW = 'NEW',
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export interface Task {
    id?: string;
    userId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    categoryId?: string;
    completed: boolean;
    createdAt: Date | Timestamp;
    updatedAt: Date | Timestamp;
}