import { Component } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  users: User[] = [];
  selectedUser: User = { id: 0, username: '', password: '' };
  isEditMode = false;

  constructor(private userService: UserService) { this.loadUsers(); }

  loadUsers(): void { this.users = this.userService.getUsers(); }

  addUser(): void {
    if (!this.isEditMode) { this.userService.addUser({ ...this.selectedUser }); }
    else {
      this.userService.updateUser({ ...this.selectedUser });
      this.isEditMode = false;
    }
    this.selectedUser = { id: 0, username: '', password: '' };
    this.loadUsers();
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
  }
}
