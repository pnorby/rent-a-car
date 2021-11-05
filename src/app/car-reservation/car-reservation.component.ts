import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

interface CarDisplay {
  title: string;
  visual: string;
  description: string;
}

@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.css']
})
export class CarReservationComponent implements OnInit {

  constructor(
    public carSvc: CarService
  ) { }

  ngOnInit(): void {
    const cars = this.carSvc.loadCars();
    this.availableCars = cars.map(x =>({
      title: x.year + " " + x.make + " " + x.model,
      description: x.description,
      visual:x.visual
      
    }))
    
    console.log(cars);

    this.selectedCar = this.availableCars[0];
  }

  selectedCar: CarDisplay | undefined = undefined;

  availableCars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    this.selectedCar = c;
  } 
}
