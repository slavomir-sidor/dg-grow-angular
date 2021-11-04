import { Component } from '@angular/core';
import { MenuService } from './shared/service/menu.service';
import { AuthenticationService } from './shared/service/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'DG - Grow - Angular';
	items = [
		{
			label: 'Welcome',
			routerLink: ['/', 'welcome']

		},
		{
			label: 'New Product',
			routerLink: ['/', 'products', 'new']
		},
		{
			label: 'Sales',
			routerLink: ['', 'products', 'sales']
		}
	];

	constructor(
		private menuService: MenuService,
		private messageService: MessageService,
		private authenticationService: AuthenticationService
	) { }

	isAuthenticated(): boolean {
		return this.authenticationService.isAuthenticated();
	}
}