import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreSoonComponent } from './more-soon.component';

describe('MoreSoonComponent', () => {
  let component: MoreSoonComponent;
  let fixture: ComponentFixture<MoreSoonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreSoonComponent]
    });
    fixture = TestBed.createComponent(MoreSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
