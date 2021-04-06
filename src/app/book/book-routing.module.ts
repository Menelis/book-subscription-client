import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth-guard.guard';

import { ListComponent } from './list/list.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

const routes: Routes = [
  { path: 'book/list', component: ListComponent },
  { path:'book/subscribe/:id', component: SubscribeComponent, canActivate:[AuthGuard]},
  { path:'book/unsubscribe/:id', component: UnsubscribeComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
