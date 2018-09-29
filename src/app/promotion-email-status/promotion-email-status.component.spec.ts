import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionEmailStatusComponent } from './promotion-email-status.component';

describe('PromotionEmailStatusComponent', () => {
  let component: PromotionEmailStatusComponent;
  let fixture: ComponentFixture<PromotionEmailStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionEmailStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionEmailStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
