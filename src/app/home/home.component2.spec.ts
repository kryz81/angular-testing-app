import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../testHelpers';
import { CounterComponent } from '../counter/counter.component';
import { MockComponent, MockComponents } from 'ng-mocks';
import { CounterWithServiceComponent } from '../counter-with-service/counter-with-service.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let cmp: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // lepsza wersja zamiast wylaczania Schema: zmockowanie komponentu za pomoca ng-mocks
      declarations: [
        HomeComponent,
        MockComponents(CounterComponent, CounterWithServiceComponent),
      ],
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

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.componentInstance.startCount).toEqual(5);
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
});
