import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { VeiculoForm } from './components/veiculo-form/veiculo-form';
import { VeiculoList } from './components/veiculo-list/veiculo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    VeiculoForm,
    VeiculoList
  ],
  templateUrl: './app.html'
})
export class App {}
