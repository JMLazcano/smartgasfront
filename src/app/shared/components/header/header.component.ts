import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SessionService } from 'src/app/common/services/session.service';
import { LoginService } from 'src/app/common/services/login.service';
import { LogoutService } from 'src/app/common/services/logout.service';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarPage: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private loginService: LoginService,
              private logoutService: LogoutService, public sessionService: SessionService) { }

  ngOnInit(): void {
    this.loginService.checkToken();
  }

  toggleSideBar() {
    this.toggleSideBarPage.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  logout(): void {
    this.logoutService.attemptLogout()
      .then(response => {
        this.goToPage('login');
        localStorage.removeItem('ma-token');
        this.sessionService.setLoginState(false);
      })
      .catch(err => {
        console.log('something went wrong while logging out')
        console.log(err)
      })
  }
}
