import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarInterface } from '../interfaces/car.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  carList: CarInterface[];
  filteredCars: Observable<CarInterface[]>;
  public form: FormGroup;
  constructor(public _http: HttpClient, private fb: FormBuilder) { }
  ngOnInit() {

    this.getAllCars();
    this.form = this.fb.group({
      car: ['a'],
      carFilter: [null]
    });

    console.log('pruebas');
    this.filteredCars = this.form.get('carFilter').valueChanges
      .pipe(
        map(value => this._filter(value))
      );
    console.log('fin pruebas');

  }

  public getAllCarsInService(): Observable<CarInterface[]> {
    return this._http.get<CarInterface[]>('assets/carList.json');
  }

  public getAllCars() {
    this.getAllCarsInService().subscribe((cars: CarInterface[]) => {
      this.carList = cars;
      console.log(this.carList);

    });
  }
  private _filter(value: string): CarInterface[] {
    const filterValue = value.toLowerCase();
    console.log(this.carList.filter(car => car.name.toLowerCase().includes(filterValue)))
    return this.carList.filter(car => car.name.toLowerCase().includes(filterValue));
  }
}
