import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComandaComponent } from './add-comanda.component';

describe('AddComandaComponent', () => {
  let component: AddComandaComponent;
  let fixture: ComponentFixture<AddComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
