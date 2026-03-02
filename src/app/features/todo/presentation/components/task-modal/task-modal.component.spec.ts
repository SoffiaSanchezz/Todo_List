import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalComponent } from './task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { TodoInteractor } from '../../../application/todo.interactor';
import { of } from 'rxjs';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    const todoInteractorSpy = { 
      createTask: () => of(null), 
      editTask: () => of(null) 
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        IonicModule.forRoot(),
        TaskModalComponent
      ],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: TodoInteractor, useValue: todoInteractorSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    
    // Forzamos el spy en la instancia real por si la inyección falló
    (component as any).modalController = modalCtrlSpy;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismiss with false when onCancel is called', async () => {
    await component.onCancel();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(false);
  });
});
