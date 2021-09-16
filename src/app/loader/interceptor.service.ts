import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


  constructor(public loaderService: LoaderService) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }
}
