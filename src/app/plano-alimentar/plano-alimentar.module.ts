import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoAlimentarComponent } from './plano-alimentar.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { TabMenuModule } from '../../../node_modules/primeng/tabmenu';
import { AutoCompleteModule } from '../../../node_modules/primeng/autocomplete';
import { SelectButtonModule } from '../../../node_modules/primeng/selectbutton';
import { TableModule } from '../../../node_modules/primeng/table';

@NgModule({
  declarations: [
      PlanoAlimentarComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
    AutoCompleteModule,
    SelectButtonModule,
    TableModule,
    UtilitariosModule
  ],
  exports:[
    PlanoAlimentarComponent
  ]
})
export class PlanoAlimentarModule { }
