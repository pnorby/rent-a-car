import { NodeWithI18n } from '@angular/compiler';
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

interface ReservationDisplay {
  car: CarDisplay;
  from: string;
  to: string;
  fee: Number;
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
    this.currentReservation = {car:this.selectedCar, from: '', to: '', fee: 0 };
  }
  currentReservation: ReservationDisplay | undefined;
  maxRentalsReached = false;
  rentedCars: ReservationDisplay[] = [];

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
    this.currentReservation = undefined;
  } 

  selectReservation = (r: ReservationDisplay) => {
      this.selectedCar = r.car;
      this.currentReservation = r;
  }

  reserveCar = () => {
   if(this.rentedCars.length < 3) {
      this.selectedCar.available = false;  
    
      if(this.currentReservation){
        this.rentedCars = [
          ...this.rentedCars
          , this.currentReservation
        ]
      }
      
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
