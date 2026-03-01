// src/app/domain/entities/category.entity.ts
import { Timestamp, FieldValue } from '@angular/fire/firestore';

export interface Category {
    id: string;
    userId: string;
    name: string;
    color: string;
    createdAt: Date | Timestamp | FieldValue;
    updatedAt: Date | Timestamp | FieldValue;
}