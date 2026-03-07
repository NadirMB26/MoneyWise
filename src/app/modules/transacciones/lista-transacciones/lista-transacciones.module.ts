import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTransaccionesPageRoutingModule } from './lista-transacciones-routing.module';

import { ListaTransaccionesPage } from './lista-transacciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTransaccionesPageRoutingModule
  ],
  declarations: [ListaTransaccionesPage]
})
export class ListaTransaccionesPageModule {}
