import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'heroes-app';

  constructor(private readonly authService: AuthService) {}
  ngOnInit(): void {
    this.authService
      .checkAuthentication()
      .subscribe(() => console.log('checkAuthentication finish'));
  }
}
