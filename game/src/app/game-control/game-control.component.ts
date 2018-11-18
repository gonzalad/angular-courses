import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output()
  gameEvent: EventEmitter<number> = new EventEmitter();
  gameEventCount = 0;
  started: boolean;

  constructor() {}

  ngOnInit() {}

  start() {
    this.started = true;
    this.gameLoop();
  }

  stop() {
    this.started = false;
  }

  isStarted(): boolean {
    return this.started;
  }

  private gameLoop() {
    this.emitGameEvent();
    if (this.started) {
      setTimeout(() => this.gameLoop(), 1000);
    }
  }

  private emitGameEvent() {
    this.gameEventCount++;
    this.gameEvent.emit(this.gameEventCount);
    console.log('event emitted');
  }
}
