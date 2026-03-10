import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { StorageService } from '../../../core/services/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private storage: StorageService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

async register() {

  if(!this.nombre || !this.email || !this.password){

    const toast = await this.toastController.create({
      message: 'Todos los campos son obligatorios',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });

    await toast.present();
    return;
  }

  const emailNormalizado = this.email.toLowerCase().trim();

  await this.storage.remove('session'); // 👈 limpiar sesión anterior

  let users = await this.storage.get('users') || [];

  const exist = users.find((u:any) =>
    u.email.toLowerCase() === emailNormalizado
  );

  if(exist){

    const toast = await this.toastController.create({
      message: 'Este correo ya está registrado',
      duration: 2000,
      position: 'middle',
      color: 'warning'
    });

    await toast.present();
    return;
  }

  const newUser = new User(
    Date.now().toString(),
    this.nombre,
    emailNormalizado,
    this.password,
    []
  );

  users.push(newUser);

  await this.storage.set('users', users);

  await this.storage.set('session', newUser);

  const toast = await this.toastController.create({
    message: 'Usuario registrado correctamente',
    duration: 2000,
    position: 'middle',
    color: 'success'
  });

  await toast.present();

  this.router.navigate(['/tabs/dashboard']);

}

}