import { User } from './user.model';
import { EventEmitter } from '@angular/core';

export class UserService {
  users: User[] = [new User('Max', true), new User('Anna', true), new User('Chris', false), new User('Manu', false)];
  onUserChanged: EventEmitter<User> = new EventEmitter();

  activateUser(user: User) {
    user.isActive = true;
    this.onUserChanged.emit(user);
  }

  activateUserByName(name: string) {
    this.activateUser(this.findUserByName(name));
  }

  deactivateUser(user: User) {
    user.isActive = false;
    this.onUserChanged.emit(user);
  }

  deactivateUserByName(name: string) {
    this.deactivateUser(this.findUserByName(name));
  }

  private findUserByName(name: string): User {
    const foundUsers = this.users.filter(user => user.name === name);
    return foundUsers.length > 0 ? foundUsers[0] : null;
  }
}
