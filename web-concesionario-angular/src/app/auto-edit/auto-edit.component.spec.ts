import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoEditComponent } from './auto-edit.component';

describe('AutoEditComponent', () => {
  let component: AutoEditComponent;
  let fixture: ComponentFixture<AutoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
