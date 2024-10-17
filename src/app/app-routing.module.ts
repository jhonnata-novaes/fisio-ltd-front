import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes.component';
import { LoginComponent } from './login/login.component';
import { NovopacienteComponent } from './novopaciente/novopaciente.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'novopaciente', component: NovopacienteComponent }, // Para cadastro de novo paciente
  { path: 'editarpaciente/:id', component: NovopacienteComponent } // Para edição de paciente existente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
