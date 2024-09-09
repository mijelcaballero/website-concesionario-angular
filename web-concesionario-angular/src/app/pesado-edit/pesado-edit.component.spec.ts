import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesadoEditComponent } from './pesado-edit.component';

describe('PesadoEditComponent', () => {
  let component: PesadoEditComponent;
  let fixture: ComponentFixture<PesadoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesadoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
