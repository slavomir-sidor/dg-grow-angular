import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService, Table } from '../../shared/service/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.css'],
	providers: [DialogService]
})
export class SalesComponent implements OnInit {

	items?: any;

	dialog: boolean = false;

	searchText: string = "";

	constructor(
		private dialogService: DialogService,
		private messageService: MessageService,
		private productService: ProductService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.productService.salesChangedEmmiter.subscribe((data) => {
			this.onProductSalesChanged(data);
		});
		this.productService.getSales();
	}

	ngOnDestroy(): void {
		//this.productService.salesChangedEmmiter.unsubscribe();
	}

	public newClick(): void {
		this.dialog = true;
	}
	
	public onNewProductSave=(): void =>{
		this.dialog = false;
	}

	private onProductSalesChanged(data: any): void {
		this.items = data;
	}

	onEditComplete(event: any): void {
		this.productService.setSales(this.items);
	}

}