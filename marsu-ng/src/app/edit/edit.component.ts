import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarsuService } from '../marsu.service';
import { Marsupilami } from '../model/Marsupilami';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    family: ['', Validators.required],
    race: ['', Validators.required],
    food: ['', Validators.required],
    password: ['', Validators.required]
  })

  connectedMarsu: Marsupilami

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: MarsuService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.getMarsuById(id).subscribe(
      data => {
        this.connectedMarsu = data
        this.editForm.patchValue({
          name: data.name,
          username: data.username,
          family: data.family,
          race: data.race,
          food: data.food,
          password: data.password
        })
      }
    )
  }

  edit() {
    if(this.editForm.valid) {
      this.connectedMarsu.name = this.name.value
      this.connectedMarsu.username = this.username.value
      this.connectedMarsu.family = this.family.value
      this.connectedMarsu.race = this.race.value
      this.connectedMarsu.food = this.food.value
      this.connectedMarsu.password = this.password.value

      this.service.editMarsu(this.connectedMarsu).subscribe(
        data => {
          console.log(`Marsu Edited !`, data);
        },
        err => console.log(err),
        () => this.router.navigate(['/note'])
      )
    }
  }

  resetForm() {
    this.editForm.reset()
  }

  // To handle wrong entry on model
  get name() { return this.editForm.get('name') }
  get username() { return this.editForm.get('username') }
  get family() { return this.editForm.get('family') }
  get birth() { return this.editForm.get('birth') }
  get race() { return this.editForm.get('race') }
  get food() { return this.editForm.get('food') }
  get password() { return this.editForm.get('password') }

}
