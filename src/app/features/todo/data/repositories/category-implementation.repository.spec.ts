import { TestBed } from '@angular/core/testing';
import { CategoryImplementationRepository } from './category-implementation.repository';
import { LocalStorageDatasource } from '../datasources/local-storage.datasource';
import { CategoryService } from '@shared/services/category/category.service';
import { of, from } from 'rxjs';

describe('CategoryImplementationRepository', () => {
  let repository: CategoryImplementationRepository;
  let mockLocalStorage: jasmine.SpyObj<LocalStorageDatasource>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    mockLocalStorage = jasmine.createSpyObj('LocalStorageDatasource', ['create', 'getAll']);
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['addCategory', 'getAllCategories']);

    TestBed.configureTestingModule({
      providers: [
        CategoryImplementationRepository,
        { provide: LocalStorageDatasource, useValue: mockLocalStorage },
        { provide: CategoryService, useValue: mockCategoryService }
      ]
    });

    repository = TestBed.inject(CategoryImplementationRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should create a category locally and then sync with Firebase', (done) => {
    const newCategory = { name: 'Work', color: '#FF0000' };
    const savedLocal = { id: 'local-1', ...newCategory };

    mockLocalStorage.create.and.returnValue(of(savedLocal));
    mockCategoryService.addCategory.and.returnValue(Promise.resolve({ id: 'firebase-1' } as any));

    repository.createCategory(newCategory).subscribe(result => {
      expect(result).toEqual(savedLocal);
      expect(mockLocalStorage.create).toHaveBeenCalled();
      expect(mockCategoryService.addCategory).toHaveBeenCalledWith(newCategory.name, newCategory.color);
      done();
    });
  });
});
