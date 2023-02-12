import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { MockComponent } from 'ng-mocks';
import { CounterWithServiceComponent } from '../counter-with-service/counter-with-service.component';

@Component({
  selector: 'app-counter',
  template: '',
})
class FakeCounterComponent implements Partial<CounterComponent> {
  @Input()
  startCount: number;

  faked = 'FAKED!';

  @Output()
  public countChange = new EventEmitter<number>();
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let cmp: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // wersja z wlasnym recznym mockiem
      declarations: [
        HomeComponent,
        FakeCounterComponent,
        MockComponent(CounterWithServiceComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    cmp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders an independent counter', () => {
    const { debugElement } = fixture;
    const counter = debugElement.query(By.directive(FakeCounterComponent));
    expect(counter).toBeTruthy();
    expect(counter.componentInstance.faked).toEqual('FAKED!');
  });

  it('listens for count changes', () => {
    const { debugElement } = fixture;
    const counter = debugElement.query(By.directive(FakeCounterComponent));
    counter.componentInstance.countChange.emit(20);
    expect(cmp.receivedCounts).toEqual([20]);
  });
});
