import { Component, OnInit } from '@angular/core';
import { Gas } from 'src/app/common/datatypes/gas';
import { GasService } from 'src/app/common/services/gas.service';

@Component({
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.scss']
})
export class GasComponent implements OnInit {

  gas: Gas[] = [];

  constructor(private gasService: GasService) { }

  ngOnInit(): void {
    this.gasService.getGas().then(response=> {
      this.gas = response;
    }).catch(e => {
      console.log('Error: ', e);
    })
  }


}