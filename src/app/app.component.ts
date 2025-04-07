import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs: Tab[] = [
    { id: 'tasks', label: 'TASKS & TRACKER' },
    { id: 'inspections', label: 'INSPECTIONS' },
    { id: 'openItems', label: 'OPEN ITEMS' },
    { id: 'capex', label: 'CAPITAL EXPENDITURES' }
  ];

  activeTab = 'tasks';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}