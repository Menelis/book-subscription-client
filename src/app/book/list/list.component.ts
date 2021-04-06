import { AuthService } from './../../core/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

import { RepositoryService } from '../../core/services/repository.service';
import { BookDto } from '../../core/models/book-dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public books: BookDto[] = [];

  constructor(private _repo:RepositoryService, private _auth: AuthService ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks = () =>{
    let url = 'book/GetSubscriptions';
    let userId = this._auth.UserId;
    if(!!userId)
       url = `${url}?userId=${userId}`;
    this._repo.getData(url).subscribe((result: any) =>{
      this.books = result as BookDto[];
    }, (error) =>{})
  }
  public setSubscriptionUrl = (subscription: BookDto) =>{
    return `/book/`
  }
}
