import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual = new BehaviorSubject<any>(null);

  // observable para escuchar cambios de usuario
  usuarioActual$ = this.usuarioActual.asObservable();

  constructor(private storage: StorageService) {}

  async login(email: string, password: string) {

    let users = await this.storage.get('users') || [];

    const userFound = users.find((u:any)=>
      u.email === email && u.password === password
    );

    if(userFound){

      await this.storage.set('session', userFound);

      this.usuarioActual.next(userFound);

      return true;

    }

    return false;
  }

  async register(usuario:any){

    let users = await this.storage.get('users') || [];

    users.push(usuario);

    await this.storage.set('users', users);

    await this.storage.set('session', usuario);

    this.usuarioActual.next(usuario);

  }

  getUsuario(){
    return this.usuarioActual.value;
  }

  async getUsuarioActual(){

    let user = this.usuarioActual.value;

    if(!user){

      user = await this.storage.get('session');

      if(user){
        this.usuarioActual.next(user);
      }

    }

    return user;

  }

  async logout(){

    await this.storage.remove('session');

    this.usuarioActual.next(null);

  }

}