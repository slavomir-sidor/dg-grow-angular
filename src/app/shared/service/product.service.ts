import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

export class TableHeader {
	rows: Map<number, TableRow> = new Map();

	setCell(name: string, data: any, row: number, cell: number, colspan: number =1, rowspan: number = 1) {
		let cellRow = this.rows.get(row);
		if (typeof cellRow === "undefined") {
			cellRow = new TableRow();
		}
		cellRow.setCell(name, data, cell, colspan, rowspan);
		this.rows.set(row,cellRow);
	}
}
export class TableRow {
	cells: Map<number, TableCell> = new Map();

	setCell(name: string, data: any, cell: number, colspan: number = 1, rowspan: number = 1) {

		let rowCell = new TableCell();
		rowCell.data = data;
		rowCell.name = name;
		rowCell.colspan = colspan;
		rowCell.rowspan = rowspan;
		this.cells.set(cell, rowCell);
	}
}

export class TableCell {
	colspan?: number;
	rowspan?: number;
	name?: string;
	data?: any;
}

export class Table {
	header: TableHeader = new TableHeader();
	data: [] = [];
}

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	/**
	 * Product Sales 
	 * 
	 * @private : Data are recalculating, no direct access to this property is provided
	 */
	private sales?: any;


	static STORAGE_KEY: string = "SALES";

	@Output()
	public salesChangedEmmiter: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * Constructor
	 * 
	 * @param {HttpClient} http : Angular HTTP Client
	 * @public
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * Puts product to the sales local storage on browser runtime
	 * 
	 * @public
	 */
	public putProduct(product: Product): Promise<Product> {
		return new Promise((resolve, reject) => {
			try {
				let promise = this.getSales();
				promise.then((sales) => {
					sales.data.push(product);
					this.setSales(sales);
					resolve(product);
				}).catch((error) => reject(error));

			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * Get Sales method is lazy lading data from the assets products potato_sales.json file only once,
	 * since this method as invoked.
	 */
	public getSales(): Promise<any> {
		return new Promise((resolve, reject) => {
			let sales = window.localStorage.getItem(ProductService.STORAGE_KEY);

			if (sales !== null) { //persistem to runtime, also refresh, the property is persistante only if application is navigated
				this.setSales(JSON.parse(sales));
				resolve(this.sales);
			} else {
				this.http.get("./assets/products/potato_sales-run.json").toPromise()
					.then((sales) => {
						this.setSales(this.normalize(sales));
						resolve(sales);
					}).catch((error) => {
						reject(error);
					});
			}

		});
	}

	/**
	 *
	 */
	private calculateSalesTotals(items: any): any {
		// Claculated columns declaration
		let cols: string[] = [];

		// Total declaration
		let total: number;

		// Extract columns for Sales 
		for (let i = 0; i < items.column.length; i++) {

			if (items.column[i].header === "Sales") {
				// specification column.field of Sales is missing in JSON, it is better to use code,
				// instead of kind of language message, column.header
				for (let j = 0; j < items.column[i].subHeaders.length; j++) {
					cols.push(items.column[i].subHeaders[j].field);
				}
			}

			// missing column.field for Total sales
			if (items.column[i].header === "Total sales") {
				items.column[i].field = "totalSales";
				items.column[i].editable = false;
			}
		}

		// Calculate for each row
		for (let i = 0; i < items.data.length; i++) {
			total = 0;
			Object.keys(items.data[i])
				.filter(key => cols.includes(key))
				.reduce((obj: any, key) => {
					obj[key] = items.data[i][key];
					total += items.data[i][key];
					return obj;
				}, {});
			items.data[i]["totalSales"] = total;
		}
		return items;
	}

	/**
	 * 
	 */
	private setSales(items: any): void {
		this.sales = <any>items;
		//this.calculateSalesTotals(items);
		//window.localStorage.setItem(ProductService.STORAGE_KEY, JSON.stringify(this.sales));
		this.salesChangedEmmiter.emit(this.sales);
	}

	private normalize(items: any): Table {
		let table = new Table();
		table.data = items['data'];
		table.header = this.normalizeColumns(table.header, items['column']);

		return table;
	}

	private normalizeColumns(header: TableHeader, columns: any): TableHeader {

		for (let i = 0; i < columns.length; i++) {
			header = this.normalizeColumn(header, columns[i], 0, i);
		}

		return header;
	}

	private normalizeColumn(header: TableHeader, column: any, row : number, col: number): TableHeader {
		let dimmension = this.getColumnDimension(column);
		header.setCell(column['field'], column['header'], row, col, dimmension.width, 1);
		return header;
	}

	private getDataDimension(columns: any, row: number, col: number): any {

		for (let i = 0; i < columns.length; i++) {
			columns[i].dimension = this.getColumnDimension(columns[i]);
		}

		return columns;
	}

	private getColumnDimension(column: any): any {

		let dimenstion = {
			width: 1,
			height: 1
		};

		if (column.subHeaders) {
			for (let i = 0; i < column.subHeaders.length; i++) {
				dimenstion.width += this.getColumnDimension(column.subHeaders[i]).width;
			}
		}
		return dimenstion;
	}
}