import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), 
        RouterModule.forRoot([]),
        LayoutComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
