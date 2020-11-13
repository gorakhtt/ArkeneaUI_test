import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { DeleteComponent } from '../delete/delete.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public addCusForm: FormGroup;
  formData: any = [];
  languages = new FormControl();
  langList: string[] = ['Marathi', 'English', 'Hindi', 'Tamil', 'French', 'Chinese'];
  setGender: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public userService: UsersService,
    private notifyService: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public ngOnInit(): void {

    this.addCusForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      languages: new FormControl('',Validators.required),
      dob: new FormControl(''),
      gender: new FormControl(''),
      about: new FormControl(''),
    });
  }

  public addUser() {
    this.formData = this.addCusForm.getRawValue();

    if (this.addCusForm.valid) {
      this.setGender = true;
      this.userService.createUser(this.formData).subscribe((response) => {
        this.notifyService.showSuccess("User save successfully !!", "Arkenea User Management")
        this.dialogRef.close();
        this.navigateUserList()
        window.location.reload();
        console.log(this.formData);
      })
    }else{
      this.notifyService.showError("Please select all fields !!", "Arkenea User Management")
    }


  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  navigateUserList() {
    this.router.navigate(['']);
  }

}