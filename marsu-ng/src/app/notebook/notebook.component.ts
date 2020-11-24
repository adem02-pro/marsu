import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';
import { ImagesTab } from '../images'

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  loggedMarsu: Marsupilami
  displayFriends: boolean = true
  friendsList: Marsupilami[] = []
  catalog: Marsupilami[] = []
  randomImage: any

  constructor(private service: MarsuService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData()
    this.randomImage = ImagesTab[Math.floor(Math.random() * ImagesTab.length)]
  }

  fetchData() {
    this.service.getMarsu().subscribe(
      data => {
        this.loggedMarsu = data
        data.friends.map(friend => {
          this.service.getMarsuById(friend).subscribe(
            data => {
              this.friendsList.push(data);
            }
          );
        })
        this.service.getMarsus().subscribe(
          data => {
            data.map(marsu => {
              if (!this.service.isAFriend(this.loggedMarsu.friends, marsu._id) && marsu._id !== this.loggedMarsu._id)
                this.catalog.push(marsu);
            });
          }
        )
      }
    )
  }

  refreshData() {
    this.catalog = []
    this.friendsList = []
    this.fetchData()
  }

  logout() {
    this.service.logout().subscribe
    (
      data => {
        this.router.navigate(['/login'])
      }
    )
  }

  add(id) {
    const friend = { friend: id }
    this.service.addFriend(friend).subscribe(
      data => {
        this.friendsList.push(data)
        this.catalog = this.catalog.filter(el => el !== data)
      },
      err => console.log(err),
    )
  }

  goToFriends() {
    this.displayFriends = true
    this.refreshData()
  }

  goToCatalog() {
    this.displayFriends = false
    this.refreshData()
  }

  seeProfil() {
    this.service.getFriendsList().subscribe(
      data => console.log(data)
    )
  }

  deleteFriend(id: string) {
    this.service.deleteFriend(id).subscribe(
      data => {
        this.catalog.push()
        this.friendsList = this.friendsList.filter(el => el !==data)
      },
      err => console.log(err),
    )
  }

  editProfile(id: string) {
    this.router.navigate(['edit', id])
  }

}
