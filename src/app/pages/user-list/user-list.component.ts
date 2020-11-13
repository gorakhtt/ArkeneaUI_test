import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
export interface PeriodicElement {
  name: string;
  dob: string;
  lang: string
  gender: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dob', 'lang', 'gender'];
  dataSource = [];
  maleCount: number = 0;
  femaleCount: number = 0;
  TotalCount: number = 0;

  constructor(public dialog: MatDialog,
    private httpClient: HttpClient,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '640px', disableClose: true
    });
  }
  // get user list
  getUserList() {
    this.userService.getUserList().subscribe((response: any) => {
      this.dataSource = response;
      if (response) {
        this.maleCount = 0;
        this.femaleCount = 0;

        response.forEach(element => {
          if (element.gender == 'Male') {
            this.maleCount = this.maleCount + 1;
          }

          if (element.gender == 'Female') {
            this.femaleCount = this.femaleCount + 1;
          }


        });
        this.TotalCount = this.maleCount + this.femaleCount; //progress count

      }

    })
  }
}
