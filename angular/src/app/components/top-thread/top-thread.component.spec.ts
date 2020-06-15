import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreadComponent } from './top-thread.component';

describe('TopThreadComponent', () => {
  let component: TopThreadComponent;
  let fixture: ComponentFixture<TopThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
