import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }

  createUser(user){

    return this.httpClient.post("http://localhost:3000/users",user)
  }
  getUserList(){
    return this.httpClient.get("http://localhost:3000/users")
  }
  
}
