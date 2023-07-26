import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorsService } from './auth-interceptors.service';

@NgModule({
  declarations: [AppComponent],
  //multi used for use the one or more interceptors
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS,
               useClass: AuthInterceptorsService,
              multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
