import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: MarsuService) { }

  ngOnInit(): void {

  }

}
