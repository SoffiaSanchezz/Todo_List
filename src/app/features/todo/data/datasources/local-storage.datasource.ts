import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; // Will need to install uuid

/**
 * Generic data source for interacting with localStorage.
 * Handles basic CRUD operations for collections of objects.
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageDatasource {
  private _storageKeyPrefix = 'todo_app_';

  constructor() {
    // Check if uuid is available, if not, provide a warning or alternative.
    // For now, assuming uuid will be installed.
    // If running in browser, localStorage is usually available.
  }

  /**
   * Retrieves all items from a specified collection.
   * @param collectionName The name of the collection (e.g., 'tasks', 'categories').
   * @returns An Observable of an array of items.
   */
  getAll<T>(collectionName: string): Observable<T[]> {
    try {
      const data = localStorage.getItem(this._storageKeyPrefix + collectionName);
      return of(data ? JSON.parse(data) : []);
    } catch (error) {
      return throwError(() => new Error(`Error getting ${collectionName} from local storage: ${error}`));
    }
  }

  /**
   * Retrieves an item by its ID from a specified collection.
   * @param collectionName The name of the collection.
   * @param id The ID of the item to retrieve.
   * @returns An Observable of the item or undefined if not found.
   */
  getById<T extends { id: string }>(collectionName: string, id: string): Observable<T | undefined> {
    return this.getAll<T>(collectionName).pipe(
      // We can't use `of` here as `getAll` returns an observable.
      // So, we use map to process the array.
      (obs) => new Observable(subscriber => {
        obs.subscribe({
          next: (items) => {
            subscriber.next(items.find(item => item.id === id));
            subscriber.complete();
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }

  /**
   * Saves a new item to a specified collection.
   * Assigns a new UUID if the item does not already have an ID.
   * @param collectionName The name of the collection.
   * @param item The item to save.
   * @returns An Observable of the saved item (with its ID).
   */
  create<T extends { id?: string }>(collectionName: string, item: T): Observable<T> {
    return this.getAll<T & { id: string }>(collectionName).pipe(
      // Again, using a new Observable to handle the inner observable result
      (obs) => new Observable(subscriber => {
        obs.subscribe({
          next: (items) => {
            const newItem: T & { id: string } = {
              ...item,
              id: item.id || uuidv4(), // Assign UUID if not present
            } as T & { id: string };
            const updatedItems = [...items, newItem];
            try {
              localStorage.setItem(this._storageKeyPrefix + collectionName, JSON.stringify(updatedItems));
              subscriber.next(newItem);
              subscriber.complete();
            } catch (error) {
              subscriber.error(new Error(`Error creating ${collectionName} in local storage: ${error}`));
            }
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }

  /**
   * Updates an existing item in a specified collection.
   * @param collectionName The name of the collection.
   * @param item The item to update (must have an ID).
   * @returns An Observable of the updated item.
   */
  update<T extends { id: string }>(collectionName: string, item: T): Observable<T> {
    return this.getAll<T>(collectionName).pipe(
      (obs) => new Observable(subscriber => {
        obs.subscribe({
          next: (items) => {
            const index = items.findIndex(i => i.id === item.id);
            if (index > -1) {
              const updatedItems = [...items];
              updatedItems[index] = item;
              try {
                localStorage.setItem(this._storageKeyPrefix + collectionName, JSON.stringify(updatedItems));
                subscriber.next(item);
                subscriber.complete();
              } catch (error) {
                subscriber.error(new Error(`Error updating ${collectionName} in local storage: ${error}`));
              }
            } else {
              subscriber.error(new Error(`Item with ID ${item.id} not found in ${collectionName}.`));
            }
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }

  /**
   * Deletes an item by its ID from a specified collection.
   * @param collectionName The name of the collection.
   * @param id The ID of the item to delete.
   * @returns An Observable that completes on successful deletion.
   */
  delete(collectionName: string, id: string): Observable<void> {
    return this.getAll<any>(collectionName).pipe(
      (obs) => new Observable(subscriber => {
        obs.subscribe({
          next: (items) => {
            const updatedItems = items.filter(item => item.id !== id);
            try {
              localStorage.setItem(this._storageKeyPrefix + collectionName, JSON.stringify(updatedItems));
              subscriber.next();
              subscriber.complete();
            } catch (error) {
              subscriber.error(new Error(`Error deleting ${collectionName} from local storage: ${error}`));
            }
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }
}
