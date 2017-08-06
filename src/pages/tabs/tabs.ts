import { Component } from '@angular/core';
import { Calculator } from '../calculator/calculator'
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  calculatorTab = Calculator;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
