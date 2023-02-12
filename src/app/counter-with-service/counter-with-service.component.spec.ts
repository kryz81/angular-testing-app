import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterWithServiceComponent } from './counter-with-service.component';
import { CounterService } from '../services/counter.service';
import { click, expectText } from '../../testHelpers';

describe('CounterWithServiceComponent', () => {
  let component: CounterWithServiceComponent;
  let fixture: ComponentFixture<CounterWithServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterWithServiceComponent],
      providers: [CounterService],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows start count', () => {
    expectText(fixture, 'count', '0');
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expectText(fixture, 'count', '1');
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expectText(fixture, 'count', '-1');
  });
});
