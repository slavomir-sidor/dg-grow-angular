import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NewProductComponent } from './new-product/new-product.component';
import { SalesComponent } from './sales/sales.component';


@NgModule({
	declarations: [
		NewProductComponent,
		SalesComponent
	],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		SharedModule
	]
})
export class ProductsModule { }
