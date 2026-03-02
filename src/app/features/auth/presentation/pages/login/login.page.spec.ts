import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionProviderservice } from '@shared/services/auth/session-provider.service';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    const mockAuth = jasmine.createSpyObj('SessionProviderservice', ['login', 'signInWithGoogle']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const mockModal = jasmine.createSpyObj('ModalController', ['create']);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule, LoginPage],
      providers: [
        { provide: SessionProviderservice, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: ModalController, useValue: mockModal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
