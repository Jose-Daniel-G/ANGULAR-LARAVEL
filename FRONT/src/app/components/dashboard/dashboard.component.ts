import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../layout/header-dashboard/header.component';
import { SidebarComponent } from '../../layout/sidebar-dashboard/sidebar.component';
import { ContentWrapperComponent } from '../../layout/content-wrapper/content-wrapper.component';
import { FooterComponent } from '../../layout/footer-dashboard/footer.component';
import { ControlSidebarComponent } from '../../layout/control-sidebar/control-sidebar.component';
import { SmallBoxComponent } from '../../shared/small-box/small-box.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ContentWrapperComponent, FooterComponent,ControlSidebarComponent,SmallBoxComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
