// src/app/user-crud/user-crud.component.ts
import { Component } from '@angular/core';
import { User } from '../crud/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'],
})
export class UserCrudComponent {
  users: User[] = [];
  selectedUser: User = { id: 0, username: '', password: '' };
  isEditMode = false;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  addUser(): void {
    if (!this.isEditMode) {
      this.userService.addUser(this.selectedUser).subscribe((user: User) => {
        this.users.push(user);
        this.selectedUser = { id: 0, username: '', password: '' };
      });
    } else {
      this.userService.updateUser(this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.isEditMode = false;
        this.selectedUser = { id: 0, username: '', password: '' };
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
      this.isEditMode = false;
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
  }
}
