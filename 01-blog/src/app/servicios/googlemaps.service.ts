
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ComerciosService } from './comercios.service';
import {Injectable} from "@angular/core";



@Component({
  selector: 'app-google',
})
export class googleService {
  title: string = 'My first AGM project';
  lat: number = 40.497443 ;
  lng: number = -3.687075;
}
