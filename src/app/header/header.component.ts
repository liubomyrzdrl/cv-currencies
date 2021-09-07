import { Component, OnInit , ElementRef} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    let navHeader = this.el.nativeElement.querySelector(".nav-header")
    let burgerMenu= this.el.nativeElement.querySelector(".header__burger")

    if(!navHeader.classList.contains('active')){
      navHeader.classList.add('active');
    } else {
      navHeader.classList.remove('active')
    }

    if(!burgerMenu.classList.contains('active')){
      burgerMenu.classList.add('active');
    } else {
      burgerMenu.classList.remove('active')
    }
  }
}
