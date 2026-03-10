import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  usuario: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscripción única al estado del usuario
    this.authService.usuarioActual$.subscribe(user => {
      this.usuario = user;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}