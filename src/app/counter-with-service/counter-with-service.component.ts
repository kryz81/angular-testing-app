import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-with-service',
  templateUrl: './counter-with-service.component.html',
})
export class CounterWithServiceComponent {
  count$: Observable<number>;

  constructor(private readonly counterService: CounterService) {
    this.count$ = counterService.getCount();
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.counterService.reset(count);
    }
  }
}
