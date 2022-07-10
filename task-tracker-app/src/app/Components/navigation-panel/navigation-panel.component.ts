import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateTo(path: string) { 
    console.log(path);
    this.router.navigate(["dashboard/" + path]);
    return false;
  }
}
