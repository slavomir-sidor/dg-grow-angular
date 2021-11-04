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

	newClick(): void {
		const ref = this.dialogService.open(NewProductComponent, {
			width: '90%',
			height: '80%'
		});
	}

	private onProductSalesChanged(data: Table): void {
		this.items = data;
	}
}