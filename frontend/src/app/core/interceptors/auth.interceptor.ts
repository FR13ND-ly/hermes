import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next): any => {
    let authToken: string = localStorage.getItem('token') || 'unauthenticated';
    req = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    return next(req);
};

