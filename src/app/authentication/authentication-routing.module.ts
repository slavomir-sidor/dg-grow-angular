import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './../shared/service/auth-guard.service';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'logout',
		component: LogoutComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class AuthenticationRoutingModule { }