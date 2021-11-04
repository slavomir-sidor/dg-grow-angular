import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class MenuService {

	constructor(private router: Router) { }

	getMenuItems(): MenuItem[] {
		return [{
			label: 'Welcome',
		}, {
			label: 'New Product'
		}];
	}
}
