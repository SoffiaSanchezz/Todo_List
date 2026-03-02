import { TestBed } from '@angular/core/testing';
import { LocalStorageDatasource } from './local-storage.datasource';

describe('LocalStorageDatasource', () => {
  let service: LocalStorageDatasource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageDatasource);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform an "upsert" (create if not exists) when updating', (done) => {
    const collection = 'categories';
    const newItem = { id: 'new-id', name: 'New Category' };

    // Intentamos actualizar un item que NO existe en localStorage
    service.update(collection, newItem).subscribe({
      next: (item) => {
        expect(item).toEqual(newItem);
        
        // Verificar que realmente se guardó en localStorage
        service.getAll(collection).subscribe(items => {
          expect(items).toContain(newItem);
          done();
        });
      }
    });
  });

  it('should update an existing item', (done) => {
    const collection = 'tasks';
    const existingItem = { id: '1', title: 'Old Title' };
    const updatedItem = { id: '1', title: 'New Title' };

    // Primero creamos el item
    localStorage.setItem('todo_app_tasks', JSON.stringify([existingItem]));

    service.update(collection, updatedItem).subscribe({
      next: (item) => {
        expect(item.title).toBe('New Title');
        done();
      }
    });
  });
});
