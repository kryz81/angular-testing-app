import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../testHelpers';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let cmp: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      // jak nie mockujemy child komponentow tego komponentu lub nie importujemy w "declarations"
      // to angular wywali blad, ze nie zna tego child komponentu
      // sa rozne opcje, jedna z nich to zignorowanie nieznanych komponentow, jak tu:
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    cmp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders an independent counter', () => {
    const { debugElement } = fixture;
    const counter = debugElement.query(By.css('app-counter'));
    expect(counter).toBeTruthy();
  });

  it('renders 2 counters', () => {
    const counters = fixture.debugElement.queryAll(By.css('app-counter'));
    expect(counters.length).toEqual(1);
  });

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties.startCount).toEqual(5);
  });

  it('listens for count changes', () => {
    spyOn(console, 'log');
    const counter = findComponent(fixture, 'app-counter');
    const count = 5;
    counter.triggerEventHandler('countChange', 5);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count
    );
  });

  it('stores count updates', () => {
    spyOn(console, 'log');
    const counter = findComponent(fixture, 'app-counter');
    counter.triggerEventHandler('countChange', 5);
    counter.triggerEventHandler('countChange', 10);
    expect(cmp.receivedCounts).toEqual([5, 10]);
  });

  it('stores count updates', () => {
    spyOn(cmp, 'handleCountChange');
    const counter = findComponent(fixture, 'app-counter');
    counter.triggerEventHandler('countChange', 5);
    counter.triggerEventHandler('countChange', 10);
    expect(cmp.handleCountChange).toHaveBeenCalledTimes(2);
  });
});
