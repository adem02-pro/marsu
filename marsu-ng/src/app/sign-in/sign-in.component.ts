import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MarsuService } from '../marsu.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  newMarsu: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    family: ['', Validators.required],
    birth: ['', Validators.required],
    race: ['', Validators.required],
    food: ['', Validators.required],
    password: ['', Validators.required]
  })

  registeredMarsu: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private service: MarsuService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service.getMarsu().subscribe(
      data => {
        if (data) {
          this.service.isAuthenticated = true
          this.router.navigate(['note'])
        }
      }
    )
  }

  resetForm(form: FormGroup) {
    form.reset()
  }

  register() {
    this.service.registerMarsu(this.newMarsu.value).subscribe(
      (data) => {
        this.resetForm(this.newMarsu)
        this.service.isAuthenticated = true
      },
      err => console.log(err),
      () => console.log(`Registered !`)
    )
  }

  login() {
    this.service.login(this.registeredMarsu.value).subscribe(
      (data) => {
        if (data) {
          console.log('logged in !', data);
          this.service.isAuthenticated = true
          this.router.navigate(['/note'])
        }
      },
      err => console.log(err)
    );
  }
}
