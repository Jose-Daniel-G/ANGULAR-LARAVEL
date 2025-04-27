import { HttpInterceptorFn } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return next(req);

    const user = JSON.parse(storedUser);
    const token = user?.token;

    if (!token) return next(req);

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedRequest);
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return next(req);
  }
};
