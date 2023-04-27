import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: "Adolfoinho Pai Queixada",
      email: "dolfoinhobranco@gmail.com",
      phone: "(11) 946545655",
      address: "rua ceara, 171",
    },
    {
      id: 2,
      name: "Arthur Baiano",
      email: "baianinhobranco@gmail.com",
      phone: "(11) 9829290232",
      address: "rua paraibanos, 69",
    }
  ];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address'];

  clickedRows = new Set<User>();

  constructor(
    private userService: UserService, 
    public router: Router) { }

  ngOnInit() {
    if (this.users?.length === 0){
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }

  editUser(id: number){
    this.router.navigate([`/users/edit/${id}`])
  }
}
