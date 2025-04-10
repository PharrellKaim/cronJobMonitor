import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JobListComponent, MatIcon, MatDrawer, MatDrawerContainer, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Testqqqq';

  @ViewChild('drawer') drawer: MatDrawer | undefined;  // Referenziere das mat-drawer Element

  toggleMenu() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
