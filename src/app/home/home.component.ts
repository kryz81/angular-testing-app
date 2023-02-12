import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  receivedCounts: number[] = [];

  countFromService$: Observable<number>;

  constructor(private readonly counterService: CounterService) {
    this.countFromService$ = counterService.getCount();
  }

  public handleCountChange(count: number): void {
    console.log('countChange event from CounterComponent', count);
    this.receivedCounts.push(count);
  }
}
