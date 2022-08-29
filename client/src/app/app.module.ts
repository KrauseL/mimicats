import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { ModalPublicComponent } from './components/modal-public/modal-public.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { UserPublicacionComponent } from './components/user-publicacion/user-publicacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    LoginComponent,
    RegistroComponent,
    EditarPerfilComponent,
    AnuncioComponent,
    ModalPublicComponent,
    PublicacionComponent,
    PruebasComponent,
    UserPublicacionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
