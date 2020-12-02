import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscodeInputComponent } from './smscode-input.component';

describe('SmscodeInputComponent', () => {
  let component: SmscodeInputComponent;
  let fixture: ComponentFixture<SmscodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmscodeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmscodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
