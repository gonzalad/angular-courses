import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.servie';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input()
  users: string[];

  constructor(private userService: UserService) {}

  onSetToActive(name: string) {
    this.userService.activateUserByName(name);
  }
}
