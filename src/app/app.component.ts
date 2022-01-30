import {
  AfterContentInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';
import { ValidRoutes } from './models/common.model';
import { ValidRouteTranslator } from './const/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  public matCardHeader!: string;
  public isDarkTheme: boolean = true;
  public screenWidth: number = window.innerWidth;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('infoSidenav') infoSidenav!: MatSidenav;
  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor(private readonly location: Location) {}

  public clickHandler(): void {
    this.sidenav.close().finally();
  }

  private setHeaderBasedOnCurrentRoute(): void {
    const path: ValidRoutes = this.location.path().slice(1) as ValidRoutes;
    // the slice is for removing the / from the beginning of the path

    this.matCardHeader = ValidRouteTranslator.find(
      (validRoute) => validRoute.englishTitle === path
    )!.persianTitle;
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
  }

  ngAfterContentInit() {
    this.setHeaderBasedOnCurrentRoute();
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
