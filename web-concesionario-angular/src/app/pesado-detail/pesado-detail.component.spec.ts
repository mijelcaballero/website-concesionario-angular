import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesadoDetailComponent } from './pesado-detail.component';

describe('PesadoDetailComponent', () => {
  let component: PesadoDetailComponent;
  let fixture: ComponentFixture<PesadoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesadoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesadoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
