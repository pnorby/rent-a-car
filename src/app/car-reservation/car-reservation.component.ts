import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
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
    const d = new Date();
    this. currentDay = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
    this.currentReservation = {
    car: {...this.selectedCar},
    from:'',
    to:'',
    fee:0,
    complete:false

    }
  }
  currentDay = '';
  maxRentalsReached = false;

  rentedCars: ReservationDisplay[] = [];

  selectedCar: CarDisplay | undefined = undefined;
  currentFrom = '';
  currentTo = '';
  
  currentReservation: ReservationDisplay | undefined = undefined;

  cars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    const d = new Date();

    this.selectedCar = c;
  this.currentReservation = {
    car: {...this.selectedCar},
    from: this.currentDay,
    to: this.currentDay,
    fee: 0,
    complete: false
    }
    const toDate = <HTMLInputElement>document.getElementById("toInput");
    const fromDate = <HTMLInputElement>document.getElementById("fromInput");

    if(toDate !== null){
      toDate.value = this.currentReservation.to;
    }
    if(fromDate !== null){
      fromDate.value = this.currentReservation.from;
    }

   }

  selectReservation = (r: ReservationDisplay) => {
      this.selectedCar = this.cars.filter(x => x.id == r.car.id)[0];
      this.currentReservation = r;

      const toDate = <HTMLInputElement>document.getElementById("toInput");
      const fromDate = <HTMLInputElement>document.getElementById("fromInput");
  

    if(toDate !== null){
      toDate.value = r.to;
    }
    if(fromDate !== null){
      fromDate.value = r.from;
    }

  }
  
  toDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentTo = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()     
  }

  fromDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentFrom = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()  
  }

  reserveCar = () => {
   const theCharge = this.selectedCar == undefined? 0 : this.selectedCar.price * 3;

    if(this.rentedCars.length < 3) {
      if(this.selectedCar){
        this.selectedCar.available = false;

        this.currentReservation = {
          car: {...this.selectedCar},
          from: this.currentFrom,
          to: this.currentTo,
          fee:theCharge,
          complete:true     
          }
      }

     if(this.rentedCars && this.currentReservation){

      this.rentedCars = [
        ...this.rentedCars
        , this.currentReservation
      ];

     } 

   }
   else{
     this.maxRentalsReached = true;
    }
  }

  unReserve = () => {
    this.cars.filter(x => x == this.selectedCar)[0].available = true;
    this.maxRentalsReached = false;

    if(this.currentReservation){
      this.currentReservation.complete = false;      
    }
    const y = (this.selectedCar == undefined? 0 : this.selectedCar.id);
    this.rentedCars = this.rentedCars.filter(x => x.car.id !== y);
    
  }

  
}
