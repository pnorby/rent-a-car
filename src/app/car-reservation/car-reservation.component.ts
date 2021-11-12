import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

interface CarDisplay {
  id: number;
  year: string;
  make: string;
  model: string;
  title: string;
  mileage: string;
  price: number;
  visual: string;
  description: string;
  available: boolean;
}

interface ReservationDisplay {
  car: CarDisplay;
  from: string;
  to: string;
  fee: number;
  complete: boolean;
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
    this.currentReservation.car = this.selectedCar;
  }
  
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

  currentReservation: ReservationDisplay = {
    car: this.selectedCar,
    to: '',
    from:'',
    fee: 0,
    complete: false
  };

  cars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    this.selectedCar = c;
      this.currentReservation.car = c;
      this.currentReservation.to = "";
      this.currentReservation.from = "";
      this.currentReservation.fee = c.price;
      this.currentReservation.complete = false;
    
   }

  selectReservation = (r: ReservationDisplay) => {
      this.selectedCar = r.car;
      this.currentReservation = r;
  }
  
  toDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentReservation.to = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()     
  }

  fromDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentReservation.from = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()  
  }

  reserveCar = () => {
   this.currentReservation.fee = this.selectedCar.price * 3;

    if(this.rentedCars.length < 3) {
      this.selectedCar.available = false;
      this.currentReservation.complete = true;  
     console.log(this.currentReservation);
      this.rentedCars = [
        ...this.rentedCars
        , this.currentReservation
      ]

   }
   else{
     this.maxRentalsReached = true;
    }
  }

  unReserve = () => {
    this.cars.filter(x => x == this.selectedCar)[0].available = true;
    this.maxRentalsReached = false;
    this.currentReservation.complete = false;
    this.rentedCars = this.rentedCars.filter(x => x.car !== this.selectedCar);
  }
}
