import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoEditComponent } from './moto-edit.component';

describe('MotoEditComponent', () => {
  let component: MotoEditComponent;
  let fixture: ComponentFixture<MotoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
