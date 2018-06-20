import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRegistroComponent } from './cadastro-registro.component';

describe('CadastroRegistroComponent', () => {
  let component: CadastroRegistroComponent;
  let fixture: ComponentFixture<CadastroRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
