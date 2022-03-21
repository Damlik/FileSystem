import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsComponent } from './components/news/news.component';
import { AuthControlGuard } from './guards/auth-control.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'news', component: NewsComponent, canActivate: [AuthControlGuard] },
  { path: 'news/:id', component: NewsDetailComponent, canActivate: [AuthControlGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
