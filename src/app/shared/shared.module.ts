/**Modules */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
/**Components */

/**Services */
import { MessageService } from 'primeng/api';

@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		FormsModule,
		InputTextModule,
		TableModule,
		CardModule,
		MenubarModule,
		PanelMenuModule,
		PasswordModule,
		MessagesModule,
		MessageModule,
		PanelModule,
		ToolbarModule,
		ButtonModule,
		CalendarModule,
		DynamicDialogModule,
		ToastModule,
		DialogModule
	],
	exports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		FormsModule,
		InputTextModule,
		TableModule,
		CardModule,
		MenubarModule,
		PanelMenuModule,
		PasswordModule,
		MessagesModule,
		MessageModule,
		PanelModule,
		ToolbarModule,
		ButtonModule,
		CalendarModule,
		DynamicDialogModule,
		ToastModule,
		DialogModule
	],
	providers: [
		MessageService,

	]
})
export class SharedModule { }
