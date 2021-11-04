import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { User } from '../../shared/models/user.model';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: User = new User();

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private messageService: MessageService
	) {
	}

	ngOnInit(): void {
		if(this.authenticationService.isAuthenticated()){
			this.router.navigate(['', 'welcome']);
		}
	}

	public submit(): void {
		this.authenticationService.autheticate(this.user.login, this.user.password)
			.then((response) => {
				this.router.navigate(['', 'welcome']);
			}).catch((error) => {
				this.messageService.add({ severity: 'error', summary: 'Authentication failed', detail: "Wrong user name or password." });
			});
	}
}
