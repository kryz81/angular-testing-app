import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { TodoService } from './services/todo.service';
import { CounterService } from './services/counter.service';
import { CounterWithServiceComponent } from './counter-with-service/counter-with-service.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, HomeComponent, CounterWithServiceComponent],
  imports: [BrowserModule],
  providers: [TodoService, CounterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
