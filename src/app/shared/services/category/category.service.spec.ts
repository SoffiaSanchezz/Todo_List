import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { SessionProviderservice } from '../auth/session-provider.service';
import { of } from 'rxjs';

xdescribe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    const mockFirestore = { type: 'firestore' };
    const mockAuth = { type: 'auth' };
    const mockSession = { currentUser: of({ uid: '123' }) };

    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: Firestore, useValue: mockFirestore },
        { provide: Auth, useValue: mockAuth },
        { provide: SessionProviderservice, useValue: mockSession }
      ]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
