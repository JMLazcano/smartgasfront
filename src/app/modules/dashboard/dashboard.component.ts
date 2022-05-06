import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gasData : number[] = [];
  sideBarOpen = true;
  showChart = false;
  bigChart = {};
  cards = {};
  last : string[] = [];
  constructor(private dashboardService: DashboardService) { }
  
  ngOnInit(): void {
    this.dashboardService.getGasData().subscribe(response => {
      
      for(let i = 0; i<response.preassure.length;i++){
        this.gasData.push(parseInt(response.preassure[i].data));
        if(response.preassure.length - 4 <= i) {
          this.last.push(response.preassure[i].data);
        }
      };
      console.log(this.gasData);
      this.bigChart = [{
        name: response.name,
        data: this.gasData
      }];
      this.showChart = true;
    })
    this.cards = this.dashboardService.cards();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
