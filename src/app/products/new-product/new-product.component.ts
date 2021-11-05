import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../shared/models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/service/product.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-new-product',
	templateUrl: './new-product.component.html',
	styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

	title?: string = "New Product";

	item: Product = new Product();

	@Input()
	onSave: any;

	@Input()
	modal: boolean = false;

	@ViewChild('newForm') form: NgForm;

	constructor(
		private messageService: MessageService,
		private productService: ProductService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
	}

	public submit(): void {
		this.productService.putProduct(this.item)
			.then((response) => {
				this.item = new Product();
				if (this.modal) {
					this.onSave ? this.onSave() : true;
				} this.form.reset();
			}).catch((error) => {
				this.messageService.add({ severity: 'error', summary: 'Save product', detail: "You are not able to post wrong data and persistant api is not provided." });
			});
	}
}