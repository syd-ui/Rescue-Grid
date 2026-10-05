import { Routes } from '@angular/router';
import { Connexion } from './connexion/connexion';
import { Component } from '@angular/core';
import { Accueil } from './accueil/accueil';
import { App } from './app';

export const routes: Routes = [
    {
        path:'accueil',
        component: Accueil
    },

    {
        path:'**',
        redirectTo:''
    },

    {
        path:'',
        component: App
    }
];
