import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterWithServiceComponent } from './counter-with-service.component';
import { CounterService } from '../services/counter.service';
import { click, expectText, findElement } from '../../testHelpers';
import { of } from 'rxjs';

const CounterServiceFake = jasmine.createSpyObj<CounterService>(
  'CounterService',
  {
    getCount: of(0),
    increment: undefined,
    decrement: undefined,
    reset: undefined,
  }
);

describe('CounterWithServiceComponent', () => {
  let component: CounterWithServiceComponent;
  let fixture: ComponentFixture<CounterWithServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterWithServiceComponent],
      providers: [
        {
          provide: CounterService,
          useValue: CounterServiceFake,
        },
      ],
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
    expect(CounterServiceFake.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(CounterServiceFake.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    const elem = findElement(fixture, 'reset-input').nativeElement;
    elem.value = '10';
    elem.dispatchEvent(new Event('input'));
    click(fixture, 'reset-button');
    expect(CounterServiceFake.reset).toHaveBeenCalledWith(10);
  });

  it('does not reset when invalid value entered', () => {
    const elem = findElement(fixture, 'reset-input').nativeElement;
    elem.value = 'invalid';
    elem.dispatchEvent(new Event('input'));
    click(fixture, 'reset-button');
    expect(CounterServiceFake.reset).not.toHaveBeenCalled();
  });
});
