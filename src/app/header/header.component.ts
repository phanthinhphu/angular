import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.user = JSON.parse(localUser);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
