import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual = new BehaviorSubject<any>(null);
  
  constructor(private storage: StorageService) {}

  async login(email: string, password: string) {

    const usuario = this.storage.get('usuario');

    if (usuario && usuario.email === email && usuario.password === password) {
      await this.storage.set('session', usuario);

      this.usuarioActual.next(usuario);
      
      return true;
    }

    return false;
  }

  register(usuario: any) {
    this.storage.set('usuario', usuario);
  }

  getUsuario() {
    return this.storage.get('usuario');
  }


  async getUsuarioActual(){

  let user = this.usuarioActual.value;

  if(!user){

    user = await this.storage.get('session');

    console.log("SESSION STORAGE authservice:", user);  // 👈 verificar

    if(user){
      this.usuarioActual.next(user);
    }

  }

  return user;

}
logout(){

  this.storage.remove('session');

}

}