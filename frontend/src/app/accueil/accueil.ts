import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

interface Element{
  imageUrl:string;
  titre: string;
  texte:string;
}

@Component({
  selector: 'app-accueil',
  imports: [NgFor],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit{

  elements:Element[]=[];
  constructor(private http:HttpClient){}

  ngOnInit(): void {
      this.http.get<Element[]>('http://localhost:3000/api/post').subscribe(
        data=>this.elements=data,
        error=>console.error(error)
      );
  }
}
 