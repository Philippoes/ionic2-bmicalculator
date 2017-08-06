import { Component } from '@angular/core';
$IMPORTSTATEMENT

/**
 * Generated class for the Calculator page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
$IONICPAGE
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class Calculator {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Calculator');
  }

}
