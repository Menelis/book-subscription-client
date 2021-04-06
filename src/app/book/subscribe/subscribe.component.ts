import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  public userId: string = '';
  public bookId: string = '';
  constructor(private _repo: RepositoryService, private _route: ActivatedRoute,
            private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this._auth.UserId
    this.bookId = this._route.snapshot.params["id"];
    if(!this.bookId || !this.userId){
      this._router.navigate(['/book/list']);
    }

    this._repo.create('booksubscription/subscribe',
    {
      bookId: this.bookId,
      userId: this.userId
    }).subscribe(() => {
      this._router.navigate(['/book/list']);
    }, (error) =>{});
  }

}
