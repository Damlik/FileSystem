import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UpdateDialogComponent } from '../modal-windows/update-dialog/update-dialog.component';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  updateNewsForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    body: ['', Validators.required]
  });

  ngOnInit(): void {
  }
  
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const id = this.activatedRoute.snapshot.params['id'];

    this.dialog.open(UpdateDialogComponent, dialogConfig);
    this.router.navigate(['/news']);
    this.api.patchNews(id, 
      { title: this.updateNewsForm.controls['title'].value, 
        body: this.updateNewsForm.controls['body'].value
      }).subscribe(console.log)
  }
}
