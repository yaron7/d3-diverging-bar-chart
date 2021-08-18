import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

  data: Observable<any>;
  isCollapsed = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.data = this.api.get('insights')
  }

  toggleMessages() {
    this.isCollapsed = !this.isCollapsed;
  }

}
