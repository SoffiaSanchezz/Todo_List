import { TestBed } from '@angular/core/testing';
import { SessionProviderservice } from './session-provider.service';
import { Auth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';

describe('SessionProviderservice', () => {
  let service: SessionProviderservice;
  let mockAuth: jasmine.SpyObj<Auth>;
  let mockPlatform: jasmine.SpyObj<Platform>;

  beforeEach(() => {
    mockAuth = jasmine.createSpyObj('Auth', ['toString']); // Mock básico de Auth
    mockPlatform = jasmine.createSpyObj('Platform', ['is']);

    TestBed.configureTestingModule({
      providers: [
        SessionProviderservice,
        { provide: Auth, useValue: mockAuth },
        { provide: Platform, useValue: mockPlatform }
      ]
    });
    service = TestBed.inject(SessionProviderservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
