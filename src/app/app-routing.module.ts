import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './shared/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full', canActivate: [AdminGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/nav/nav.module#NavModule'},
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  { path: 'singup', loadChildren: './pages/user/user.module#UserModule'},
  { path: 'user', loadChildren: './pages/user/user.module#UserModule', canActivate: [AdminGuard]},
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule', canActivate: [AdminGuard] },
  { path: 'entries', loadChildren: './pages/entries/entries.module#EntriesModule', canActivate: [AdminGuard] },
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule', canActivate: [AdminGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
