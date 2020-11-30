import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';
import { nrFriends } from '../mockData'

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friend: Marsupilami

  constructor(private service: MarsuService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.friend = this.service.fakeFriends.find(marsu => id == marsu._id)
    if(!this.friend) this.service.getMarsuById(id).subscribe(
      data => this.friend = data
    )
  }

  goToNote() {
    this.router.navigate(['/note'])
  }

}
