import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { UserPublicacionComponent } from './components/user-publicacion/user-publicacion.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'pruebas',component:PruebasComponent},
  {path:'login', component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'editar-perfil/:id',component:EditarPerfilComponent},
  {path:'publicacion/:id',component:PublicacionComponent},
  {path:'perfil/:id',component:PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
