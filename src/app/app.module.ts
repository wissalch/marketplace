import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe} from '@angular/common'
import { FormsModule } from  '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { AddSouscategorieComponent } from './souscategorie/add-souscategorie/add-souscategorie.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddClientComponent } from './client/addclient/addclient.component';
import { ListclientComponent } from './client/listclient/listclient.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { ListSouscategorieComponent } from './souscategorie/list-souscategorie/list-souscategorie.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { AddFourComponent } from './fournisseur/add-four/add-four.component';
import { ListFourComponent } from './fournisseur/list-four/list-four.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { HttpClientModule} from '@angular/common/http';
import {  MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { DemoComponent } from './demo/demo.component';
import { AddPanierComponent } from './panier/add-panier/add-panier.component';
import { LpanierComponent } from './panier/lpanier/lpanier.component';
import { PayementComponent } from './payement/payement/payement.component';
import { ListpanierComponent } from './panier/listpanier/listpanier.component';
import { DecimalPipe} from '@angular/common';
import { AccueilComponent } from './accueil/accueil/accueil.component';
import { Accueil1Component } from './accueil/accueil1/accueil1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './auth/auth-guard.service';
import { AddLcommComponent } from './comm/add-lcomm/add-lcomm.component';
import { ListLcommComponent } from './comm/list-lcomm/list-lcomm.component';
import { ListCommComponent } from './comm/list-comm/list-comm.component';
import { AddCommComponent } from './comm/add-comm/add-comm.component';
import { AddlivrComponent } from './livr/addlivr/addlivr.component';
import { AddllivrComponent } from './livr/addllivr/addllivr.component';
import { ListlivrComponent } from './livr/listlivr/listlivr.component';
import { ListllivrComponent } from './livr/listllivr/listllivr.component';
import {pdfMake} from 'pdfmake/build/pdfmake';
import { map } from 'rxjs/operators';
import {pdfFonts} from 'pdfmake/build/vfs_fonts';
import { CaracteristiqueComponent } from './article/caracteristique/caracteristique.component';
import { PaypalComponent } from './paypal/paypal.component';
import { TemplateComponent } from './template/template/template.component';
import { Login1Component } from './user/login1/login1.component';
import { ListcommFourComponent } from './comm/listcomm-four/listcomm-four.component';
import { UpdateComponent } from './template/update/update.component';
import { ListhistoriqueComponent } from './listhistorique/listhistorique/listhistorique.component';
import { ChartComponent } from './chart/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { HistoriquefourComponent } from './historiquefour/historiquefour/historiquefour.component';
import { Update1Component } from './template/update1/update1.component';
import { UparticleComponent } from './article/uparticle/uparticle.component';
import 'jquery';




const MATERIAL_MODULES = [ MatToolbarModule,
MatIconModule
];

const appRoutes : Routes = [
  {path: 'panier', component: AddPanierComponent, canActivate: [AuthGuardService] },
 
  {path: 'update', component: UpdateComponent, canActivate: [AuthGuardService]},
  {path: 'update1', component: Update1Component, canActivate: [AuthGuardService]},
    
    {path: 'lpanier', component: LpanierComponent, canActivate: [AuthGuardService]},
   
    {path: 'payement', component: PayementComponent, canActivate: [AuthGuardService]},
    
  {path: 'chart', component: ChartComponent, canActivate: [AuthGuardService]},

  {path: 'profil', component: TemplateComponent, canActivate: [AuthGuardService]},

  {path: 'historique', component: ListhistoriqueComponent , canActivate: [AuthGuardService]},
  {path: 'histouriquefour', component: HistoriquefourComponent, canActivate: [AuthGuardService] },
  {path: 'livr', component: AddlivrComponent, canActivate: [AuthGuardService] },
  {path: 'llivr', component: ListlivrComponent , canActivate: [AuthGuardService]},
  {path: 'comm', component:  AddCommComponent , canActivate: [AuthGuardService]},
  {path: 'lcomm', component: ListCommComponent , canActivate: [AuthGuardService]},
  {path: 'llcomm', component: ListLcommComponent, canActivate: [AuthGuardService]},
  {path: 'listpanier', component: ListpanierComponent, canActivate: [AuthGuardService]},
  {path: 'uparticle', component: UparticleComponent, canActivate: [AuthGuardService]},

  {path: 'articles', component: ListArticleComponent},
  {path: 'article', component: AddArticleComponent},
  {path: 'panier', component: AddPanierComponent, canActivate: [AuthGuardService]},
{path: 'categories', component: ListCategorieComponent,},
{path: 'categorie', component: AddCategorieComponent,},
{path: 'souscategories', component: ListSouscategorieComponent},
{path: 'souscategorie', component: AddSouscategorieComponent},



{path: 'clients', component: ListclientComponent, canActivate: [AuthGuardService]},

{path: 'fournisseurs', component: ListFourComponent, canActivate: [AuthGuardService]},


{path: 'listuser', component: ListUserComponent, canActivate: [AuthGuardService]},

{path: 'export/excel', component: ListCategorieComponent, canActivate: [AuthGuardService]},
{path: 'demo', component: DemoComponent, canActivate: [AuthGuardService]},

{path: 'listcommfour', component: ListcommFourComponent, canActivate: [AuthGuardService]},



{path: 'paypal', component:  PaypalComponent, canActivate: [AuthGuardService]},



{path: 'accueil1', component: Accueil1Component, canActivate: [AuthGuardService]},
{path: 'accueil', component: AccueilComponent, canActivate: [AuthGuardService]},



   

{path: 'login1', component: Login1Component},
  {path: 'client', component: AddClientComponent},
  
  {path: 'fournisseur', component:  AddFourComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  

];    

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ListclientComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    AddSouscategorieComponent,
    AddArticleComponent,
    ListSouscategorieComponent,
    ListArticleComponent,
    AddFourComponent,
    ListFourComponent,
    MenuComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    DemoComponent,
    AddPanierComponent,
    LpanierComponent,
    PayementComponent,
    ListpanierComponent,
    AccueilComponent,
    Accueil1Component,
    AddLcommComponent,
    ListLcommComponent,
    ListCommComponent,
    AddCommComponent,
    AddlivrComponent,
    AddllivrComponent,
    ListlivrComponent,
    ListllivrComponent,
    CaracteristiqueComponent,
    PaypalComponent,
    TemplateComponent,
    Login1Component,
    ListcommFourComponent,
    UpdateComponent,
    ListhistoriqueComponent,
    ChartComponent,
    HistoriquefourComponent,
    Update1Component,
    UparticleComponent,
  
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    ChartsModule,
  

 

    
  ],
  providers: [DatePipe,DecimalPipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  
})

export class AppModule { }
