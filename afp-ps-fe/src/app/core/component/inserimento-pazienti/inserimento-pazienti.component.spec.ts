import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserimentoPazientiComponent } from './inserimento-pazienti.component';

describe('InserimentoPazientiComponent', () => {
  let component: InserimentoPazientiComponent;
  let fixture: ComponentFixture<InserimentoPazientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserimentoPazientiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InserimentoPazientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
