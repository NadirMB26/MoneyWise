import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private storage: StorageService) {}

  getTransacciones(){
    return this.storage.get('transacciones') || [];
  }

  guardarTransaccion(transaccion: Transaccion){

    let transacciones = this.getTransacciones();

    transacciones.push(transaccion);

    this.storage.set('transacciones', transacciones);

  }

  eliminarTransaccion(id: string){

    let transacciones = this.getTransacciones();

    transacciones = transacciones.filter((t:any)=> t.id !== id);

    this.storage.set('transacciones', transacciones);

  }

}