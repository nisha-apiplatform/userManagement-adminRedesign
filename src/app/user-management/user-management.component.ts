import { AddEmailConfigComponent } from '../add-email-config/add-email-config.component';
import { AddEnvironmentComponent } from '../add-environment/add-environment.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  users: any = {
    user_1: [
      {
        actions: 'default',
        environment: 'dev',
        password: 'password1',
        role: 'admin',
        exclusions: 'default',
      },
      {
        actions: 'default',
        environment: 'dev',
        password: 'password2',
        role: 'user',
        exclusions: 'default',
      },
    ],
    user_2: [
      {
        actions: 'default',
        environment: 'prod',
        password: 'password2',
        role: 'user',
        exclusions: 'default',
      },
    ],
    user_3: [
      {
        actions: 'default',
        environment: 'test',
        password: 'password3',
        role: 'user',
        exclusions: 'default',
      },
    ],
  };

  filteredUsers: any[] = Object.keys(this.users);
  searchTerm = '';

  constructor(public dialog: MatDialog) {}

  selectedUser: string = 'user_1';

  onUserSelected(userKey: any) {
    this.selectedUser = userKey;
    this.dataSource.data = this.getUserData(this.selectedUser);
  }

  searchItems() {
    this.filteredUsers = Object.keys(this.users).filter(
      (key: any) =>
        key.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
    );
  }

  getUserData(userKey: string): any[] {
    if (userKey) {
      return this.users[userKey];
    } else {
      return [];
    }
  }

  deleteItem(item: any) {
    delete this.users[item];
    this.filteredUsers = Object.keys(this.users).filter(
      (key: any) =>
        key.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
    );
    this.dataSource.data = this.getUserData(this.selectedUser);
  }

  dataSource = new MatTableDataSource<any>(this.getUserData(this.selectedUser));

  addRow(row: any) {
    if (this.selectedUser && this.users[this.selectedUser]) {
      this.users[this.selectedUser].push(row);
      this.dataSource.data = this.getUserData(this.selectedUser);
    }
  }

  addEnvDialog(): void {
    const dialogRef = this.dialog.open(AddEnvironmentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addRow(result);
      }
    });
  }

  addEmailConfigDialog(): void {
    const dialogRef = this.dialog.open(AddEmailConfigComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('hello');
      }
    });
  }

  displayedColumns: string[] = [
    'actions',
    'environment',
    'password',
    'role',
    'exclusions',
  ];
}
