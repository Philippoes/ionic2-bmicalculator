import { Injectable } from '@angular/core';

@Injectable()
export class BmiCalculator {

  constructor() {
  }

  calculateBmiMetric(obj) {
    let weight = obj.weight;
    let height = obj.height;
    if (weight > 0 && height > 0) {
      let finalBmi = weight / (height / 100 * height / 100);
      obj.bmiValue = parseFloat(finalBmi.toFixed(2));
      this.setBMIMessage(obj);
      return obj
    }
  };

  private

  setBMIMessage(obj) {
    if (obj.bmiValue < 18.5) {
      obj.bmiMessage = "Underweight"
    }
    if (obj.bmiValue > 18.5 && obj.bmiValue < 25) {
      obj.bmiMessage = "Normal"
    }
    if (obj.bmiValue > 25 && obj.bmiValue < 30) {
      obj.bmiMessage = "Overweight"
    }
    if (obj.bmiValue > 30) {
      obj.bmiMessage = "Obese"
    }
  }
}
