import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.servie';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input()
  users: string[];

  constructor(private userService: UserService) {}

  onSetToInactive(name: string) {
    this.userService.deactivateUserByName(name);
  }
}
