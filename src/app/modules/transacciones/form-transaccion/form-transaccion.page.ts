import { Component, OnInit } from '@angular/core';
import { Transaccion } from '../../../core/models/transaccion';
import { TransaccionService } from '../../../core/services/transaccion';

@Component({
  selector: 'app-form-transaccion',
  templateUrl: './form-transaccion.page.html',
  styleUrls: ['./form-transaccion.page.scss'],
  standalone: false,
})
export class FormTransaccionPage implements OnInit {

  tipo: 'ingreso' | 'gasto' = 'gasto';
  categoria: string = '';
  monto: number = 0;
  descripcion: string = '';

  constructor(
    private transaccionService: TransaccionService
  ) { }

  ngOnInit() {}

  guardar(){

    if(!this.categoria || !this.monto){
      alert("Debe completar los campos");
      return;
    }

    const nuevaTransaccion = new Transaccion(
      Date.now().toString(),
      this.tipo,
      this.categoria,
      new Date(),
      this.monto,
      this.descripcion
    );

    this.transaccionService.guardarTransaccion(nuevaTransaccion);

    alert("Transacción guardada");

    // limpiar formulario
    this.tipo = 'gasto';
    this.categoria = '';
    this.monto = 0;
    this.descripcion = '';

  }

}