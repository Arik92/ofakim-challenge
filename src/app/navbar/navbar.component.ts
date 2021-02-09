import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() displayName: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

}
