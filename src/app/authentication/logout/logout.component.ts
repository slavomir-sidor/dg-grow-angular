import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { MessageService } from 'primeng/api';


@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
		this.authenticationService.logout().then((response) => {
			this.router.navigate(['', 'authentication', 'login']);
		});
	}

}
