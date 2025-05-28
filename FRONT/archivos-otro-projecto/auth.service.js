export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianlove.com/2016/12/11/angular-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  user: any;
  token: string;
  constructor(
    private authHttpService: AuthHTTPService,
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getToken().subscribe();
    this.unsubscribe.push(subscr);
    this.loadState();
  }
  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = localStorage.getItem("user");
    } else {
      this.token = "";
      this.user = null;
    }
  }
  


// public methods
isLoged(){
  return (this.token.length > 5) ? true : false;
}
login(email: string, password: string) {
    this.isLoadingSubject.next(true);
    const url = URL_SERVICIOS + "/users/login";
    console.log({ email, password });
    return this.http.post<any>(url, { email, password }).pipe(
      map((auth: any) => {
        console.log(auth);
        if (auth.access_token) {
          return this.setAuthFromLocalStorage(auth);
        } else {
          return auth;
        }
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
saveLocalStorageResponse(resp: any): boolean {
    if (resp.access_token && resp.user) {
      localStorage.setItem("token", resp.access_token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      this.user = resp.user;
      this.token = resp.access_token;
      return true;
    }
    return false;
  }
// public methods
logout(){
  // localStorage.removeItem(this.authLocalStorageToken);
  this.user = null;
  this.token = '';
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/auth/login'],{
    queryParams: {},
  });
}
}