import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';
import { ImagesTab } from '../images'

declare var $:any

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  loggedMarsu$: Observable<Marsupilami>
  displayFriends: boolean = true
  friendsList: Marsupilami[] = []
  catalog: Marsupilami[] = []
  randomImage: any
  notification: boolean = false
  listMarsus$: Observable<Marsupilami[]>
  listFriends$: Observable<Marsupilami[]>
  listNonFriends$: Observable<Marsupilami[]>

  constructor(private service: MarsuService, private router: Router) {}

  ngOnInit(): void {
    this.loggedMarsu$ = this.service.getMarsu()
    this.fetchData()
    this.randomImage = ImagesTab[Math.floor(Math.random() * ImagesTab.length)]
  }

  fetchData() {
    this.listFriends$ = this.service.getFriendsList()
    this.listNonFriends$ = this.service.getNotFriendsList()
  }

  logout() {
    localStorage.removeItem('authState')
    this.service.logout().subscribe
    (
      () => this.router.navigate(['/login']),
      err => console.log(err),
    )
  }

  add(id) {
    const friend = { friend: id }
    this.service.addFriend(friend).subscribe(
      () => {
        this.notification = true
      },
      err => console.log(err),
      () => {
        $('.toast').toast('show')
        this.fetchData()
      }
    )
  }

  deleteFriend(id: string) {
    this.service.deleteFriend(id).subscribe(
      () => {
        this.notification = false
      },
      err => console.log(err),
      () => {
        $('.toast').toast('show')
        this.fetchData()
      }
    )
  }

  editProfile(id: string) {
    this.router.navigate(['edit', id])
  }

}
