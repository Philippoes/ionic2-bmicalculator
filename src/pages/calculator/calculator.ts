import { Component } from '@angular/core';
import { BmiCalculator } from '../../providers/bmi-calculator';

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class Calculator {
  height: number;
  weight: number;

  constructor(private calculatorProvider: BmiCalculator) {
  }

  doCalculateBmi(){
    let personObject = { weight: this.weight, height: this.height }
    personObject = this.calculatorProvider.calculateBmiMetric(personObject)
    console.log(personObject)
  }
}
