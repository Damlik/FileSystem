import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { News } from 'src/app/models/news';
import { ApiService } from 'src/app/services/api.service';
import { DeleteDialogComponent } from '../modal-windows/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  constructor(
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  searchString: FormControl = new FormControl('', Validators.pattern("^[0-9]*$"));
  news: News[] = [];
  initialNews: News[] = [] 

  destroySubj = new Subject();

  ngOnInit(): void {
    this.api.getCountOfNews().pipe(
      takeUntil(this.destroySubj)
    ).subscribe((value) => {
      this.initialNews = value;
      this.news = value;
    });

    this.searchString.valueChanges.pipe(
      takeUntil(this.destroySubj)
    ).subscribe(value => this.search(value))
  }

  openDialog(id?: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if(id) {
      this.api.deleteNews(id).pipe(
        takeUntil(this.destroySubj)
      ).subscribe(console.log);
    }

    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  search(value: string) {
    this.news = this.initialNews;
    if(value) {
      this.news = this.news.filter(x => x.userId === +value);
    }
  }

  ngOnDestroy(): void {
    this.destroySubj.next(1);
  }

}
