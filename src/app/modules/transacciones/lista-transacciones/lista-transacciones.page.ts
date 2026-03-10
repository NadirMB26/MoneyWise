import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { AlertController, ModalController } from '@ionic/angular';
import { TransactionDetailComponent } from 'src/app/shared/components/transaction-detail/transaction-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false
})
export class ListaTransaccionesPage implements OnInit {

  loading = true;

  tipoFiltro: string = 'todos';
  categoriaFiltro: string = '';
  textoBusqueda: string = '';

  transacciones: Transaccion[] = [];

  constructor(
    private transaccionService: TransaccionService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(){}

  cambiarTipo(event:any){
    this.tipoFiltro = event;
  }

  cambiarCategoria(event:any){
    this.categoriaFiltro = event;
  }

  cambiarBusqueda(event:any){
    this.textoBusqueda = event;
  }

  onSearchChange(event:any){
    this.textoBusqueda = event.detail.value;
  }

async ionViewWillEnter(){

  this.loading = true;

  const data = await this.transaccionService.getTransaccionesUsuario() || [];

  setTimeout(() => {

    this.transacciones = data;
    this.loading = false;

  }, 500);

}

  async cargarTransacciones(){

    this.loading = true;

    this.transacciones =
      await this.transaccionService.getTransaccionesUsuario() || [];

    this.loading = false;

  }

  async verDetalle(transaccion: Transaccion){

    const modal = await this.modalCtrl.create({
      component: TransactionDetailComponent,
      componentProps:{
        transaccion: transaccion
      }
    });

    await modal.present();

  }

  editarTransaccion(t:Transaccion){

    console.log("editar", t);

    this.router.navigate(['/tabs/editar', t.getId()]);

  }

  async eliminarTransaccion(t:Transaccion){

    const alert = await this.alertController.create({
      header: 'Eliminar transacción',
      message: '¿Desea eliminar esta transacción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'destructive',
          handler: async () => {

            await this.transaccionService.eliminarTransaccion(t.getId());

            await this.cargarTransacciones();

          }
        }
      ]
    });

    await alert.present();

  }

}