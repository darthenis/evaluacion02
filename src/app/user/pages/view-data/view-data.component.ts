import { Component } from '@angular/core';
import { user } from 'src/app/shared/intefaces/user.interface';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent {
  public user : user = {
    name : "Emiliano",
    email : "emi.acevedo.letras@gmail.com",
    password: "asdasd"
  }
}
