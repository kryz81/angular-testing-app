import { CounterComponent } from './counter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { click, expectText, findElement } from '../../testHelpers';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    // musimy utworzyc testowy modul z testowanym komponentem
    // a nastepnie wszystko skompilowac do JS
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    // teraz renderujemy testowany komponent
    // zwrocony zostanie nie sam komponent, ale wrapper na niego
    fixture = TestBed.createComponent(CounterComponent);

    // teraz musimy odpalic change detection, bo w testing
    // module nie jest to automatyczne
    fixture.detectChanges();
  });

  it('displays initial default count', () => {
    // componentInstance = prawdziwy komponent bez wrappera
    // debugElement = host element np. app-counter

    // given
    const { debugElement } = fixture;
    const count = debugElement.query(By.css("[data-testid='count']"));

    // when, then
    expect(count.nativeElement.textContent).toBe('0');
  });

  it('displays initial default count defined by the input', () => {
    // given
    const { debugElement, componentInstance } = fixture;
    componentInstance.startCount = 10; // ustawiamy bezposrednio inputs komponentu
    const count = debugElement.query(By.css("[data-testid='count']"));
    componentInstance.ngOnChanges(); // tez musimy manualnie odpalic, bo Testing Module nie robi tego
    fixture.detectChanges();

    // when, then
    expect(count.nativeElement.textContent).toBe('10');
  });

  it('increments counter on + click', () => {
    // given
    const { debugElement } = fixture;
    const incButton = debugElement.query(
      By.css("[data-testid='increment-button']")
    );

    // when
    // na elemencie odpalamy dany event, opcjonalnie podajemy konfiguracje eventu
    incButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // then
    const count = debugElement.query(By.css("[data-testid='count']"));
    expect(count.nativeElement.textContent).toBe('1');
  });

  it('decrements counter on - click', () => {
    // given
    const { componentInstance } = fixture;
    componentInstance.count = 5;

    // when
    click(fixture, 'decrement-button');

    // then
    expectText(fixture, 'count', '4');
  });

  it('resets count to the typed number', () => {
    const elem = findElement(fixture, 'reset-input').nativeElement;
    // zmieniamy bezposrednio wartosc znalezionego inputu
    elem.value = '100';
    // jak zmienimy wartosc elementu typu "input" to i tak musimy odpalic ten event
    elem.dispatchEvent(new Event('input'));
    click(fixture, 'reset-button');
    expectText(fixture, 'count', '100');
  });

  it('does not reset if the value is not a number', () => {
    const elem = findElement(fixture, 'reset-input').nativeElement;
    elem.value = 'not a number';
    elem.dispatchEvent(new Event('input'));
    click(fixture, 'reset-button');
    expectText(fixture, 'count', '0');
  });

  it('emits countChange events on increment', () => {
    // given
    const { componentInstance } = fixture;
    let actualCount = 0;

    // jak chcemy sprawdzic czy komponent odpala poprawnie dany callback/output
    // to robimy subscribe, bo ot tez Observable
    componentInstance.countChange.subscribe((count) => {
      actualCount = count;
    });

    // when
    click(fixture, 'increment-button');
    click(fixture, 'increment-button');

    // then
    expect(actualCount).toEqual(2);
  });
});
