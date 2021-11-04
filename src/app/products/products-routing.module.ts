import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './new-product/new-product.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [

	{
		path: 'new',
		component: NewProductComponent
	},
	{
		path: 'sales',
		component: SalesComponent
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	]
})
export class ProductsRoutingModule { }
