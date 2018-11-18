import { Component, OnInit } from '@angular/core';
import { UserService } from './user.servie';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers;
  inactiveUsers;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const users: User[] = this.userService.users;
    this.activeUsers = users.filter(it => it.isActive).map(it => it.name);
    this.inactiveUsers = users.filter(it => !it.isActive).map(it => it.name);
    this.userService.onUserChanged.subscribe(user => this.onUserChanged(user));
  }

  onUserChanged(user: User) {
    this.removeUser(user);
    if (user.isActive) {
      this.activeUsers.push(user.name);
    } else {
      this.inactiveUsers.push(user.name);
    }
  }

  private removeUser(user: User) {
    let index = this.activeUsers.indexOf(user.name);
    if (index > -1) {
      this.activeUsers.splice(index, 1);
    }
    index = this.inactiveUsers.indexOf(user.name);
    if (index > -1) {
      this.inactiveUsers.splice(index, 1);
    }
  }
}
