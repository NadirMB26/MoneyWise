import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent {

  constructor(
    private router:Router,
    private storage:StorageService,
    private authService: AuthService
  ){}

  logout(){

    this.authService.logout();
    this.storage.remove('session');

    this.router.navigate(['/auth/login']);

  }

}