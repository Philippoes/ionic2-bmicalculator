import { Component } from '@angular/core';
import { BmiCalculator } from '../../providers/bmi-calculator';

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class Calculator {
  height: number;
  weight: number;
  person: any;

  constructor(private calculatorProvider: BmiCalculator) {
  }

  doCalculateBmi(){
    let personObject = { weight: this.weight, height: this.height }
    this.person = this.calculatorProvider.calculateBmiMetric(personObject)
  }
}
