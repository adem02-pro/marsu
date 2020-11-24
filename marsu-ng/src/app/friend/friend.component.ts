import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friend$: Observable<Marsupilami>

  constructor(private service: MarsuService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.friend$ = this.service.getMarsuById(id)
  }

  goToNote() {
    this.router.navigate(['/note'])
  }

}
