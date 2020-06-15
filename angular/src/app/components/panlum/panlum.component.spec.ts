import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanlumComponent } from './panlum.component';

describe('PanlumComponent', () => {
  let component: PanlumComponent;
  let fixture: ComponentFixture<PanlumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanlumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanlumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
