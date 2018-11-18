import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game';
  events: number[] = [];

  onGameEvent(event: number) {
    console.log('onEvent: ' + event);
    this.events.push(event);
  }
}
