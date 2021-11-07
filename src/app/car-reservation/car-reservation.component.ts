import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

interface CarDisplay {
  id: Number;
  year: string;
  make: string;
  model: string;
  title: string;
  mileage: string;
  price: Number;
  visual: string;
  description: string;
  available: boolean;
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
    const allCars = this.carSvc.loadCars();
    this.cars = allCars.map((x:any) =>({
      ...x,
      title: x.year + " " + x.make + " " + x.model,
      available:true     
    }))
    
    this.selectedCar = this.cars[0];
  }
  maxRentalsReached = false;
  rentedCars: CarDisplay[] = [];

  selectedCar: CarDisplay = {
    id:0,
    price: 0,
    make: 'default',
    model: 'default',
    mileage: 'default',
    year: 'default',
    title:'default',
    visual:'default',
    description:'default',
    available:true
  };
  cars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    this.selectedCar = c;
  } 

  reserveCar = () => {
   if(this.cars.filter(x => x.available == false).length < 3){
      this.cars.filter(x => x.id == this.selectedCar.id)[0].available = false;
   }
   else{
     this.maxRentalsReached = true;
   }
  }

  unReserve = () => {
    this.cars.filter(x => x.id == this.selectedCar.id)[0].available = true;
    this.maxRentalsReached = false;
  }
}
