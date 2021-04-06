import { AuthService } from './../../core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/core/services/repository.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  public userId: string = '';
  public bookId: string = '';
  constructor(private _repo: RepositoryService, private _router: Router,
            private _route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this._auth.UserId;
    this.bookId = this._route.snapshot.params['id'];
    if(!this.userId || !this.bookId){
      this._router.navigate(['/book/list']);
    }

    this._repo.create('booksubscription/Unsubscribe', {
      bookId: this.bookId,
      userId: this.userId
    }).subscribe(() => {
      this._router.navigate(['/book/list']).then(() =>{
        window.location.reload();
      });
    },(error) =>{})
  }

}
