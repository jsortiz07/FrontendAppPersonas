import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'personafront';

  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;


  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService

  ) {

  }
  // Se construye el formulario y se invocan las operaciones que se realizan desde cada service

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],

    });;

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      console.log(resp);
    },
      error => { console.error(error) }
    );

    this.personaService.getAllPersonas().subscribe(resp =>{
      this.personas =resp;
    },
      error =>{ console.error(error)}
    );

    this.personaForm.get('pais').valueChanges.subscribe(value => {
      this.estadosService.getAllEstadoByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => { console.error(error) }
      );
    })
  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personas.push(resp);

    },
      error => { console.error(error) }
    )
  }

  
}
