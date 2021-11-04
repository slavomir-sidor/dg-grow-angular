import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/service/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: HomeComponent,
		data: {
			'title': 'Welcome'
		},
		canActivate: [AuthGuardService]
	},
	{
		path: 'authentication',
		loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
		data: {
			'title': 'Authentication'
		}
	},
	{
		path: 'products',
		loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
		data: {
			'title': 'Products'
		},
		canActivate: [AuthGuardService]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			// useHash: true
			enableTracing: true
		}),
	],
})
export class AppRoutingModule { }