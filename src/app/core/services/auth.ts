import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual = new BehaviorSubject<User | null>(null);

  constructor(private storage: StorageService) {}

  getUsuario(){
    return this.usuarioActual.asObservable();
  }

  async register(user: User){

    await this.storage.set('usuario', user);

    this.usuarioActual.next(user);
  }

  async login(email:string,password:string){

    const user = await this.storage.get('usuario');

    if(user && user.email === email && user.password === password){

      this.usuarioActual.next(user);

      return true;
    }

    return false;
  }

  logout(){

    this.usuarioActual.next(null);

  }
  async getUsuarioActual(){

  return this.usuarioActual.value;

}
  

}