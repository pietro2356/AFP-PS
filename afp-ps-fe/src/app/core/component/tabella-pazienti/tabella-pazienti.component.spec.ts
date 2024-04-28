import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaPazientiComponent } from './tabella-pazienti.component';

describe('TabellaPazientiComponent', () => {
  let component: TabellaPazientiComponent;
  let fixture: ComponentFixture<TabellaPazientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaPazientiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabellaPazientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
