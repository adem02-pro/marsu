import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotebookComponent } from './notebook/notebook.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ErrorComponent } from './error/error.component';
import { FriendComponent } from './friend/friend.component'
import { EditComponent } from './edit/edit.component';
import { LoggedInGuard } from './logged-in.guard'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: SignInComponent},
  {path: '',
    canActivate: [LoggedInGuard],
    children: [
      {path: 'note', component: NotebookComponent},
      {path: 'friend/:id', component: FriendComponent},
      {path: 'edit/:id', component: EditComponent},
    ]
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
