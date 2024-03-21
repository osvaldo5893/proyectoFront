import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")

  constructor(private router: Router){

  }

  ngOnInit() {
    // console.log(this.usuario)
  }

  homeLogin(){
    this.router.navigate(['/home']);
  }
  
  reloadPage() {
    console.log('reload')
    localStorage.clear();
    location.reload();
}



}
