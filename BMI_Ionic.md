

### Initiate your app
We will make use of the [Ionic Tabs](https://github.com/ionic-team/ionic2-starter-tabs) template. Navigate to the folder where you want to create your project and run the following command to start your application.

```$ ionic start bmi_calculator tabs —v2```

Once that is complete, run the following commands to add support for iOS and Android.

```$ cd bmi_calculator```

```$ ionic platform add ios```

```$ ionic platform add android```

At this point, inside the project folder, you should initialize a git repository.

```$ git init```

```$ git add .```

```$ git commit -am "scaffold new Ionic tabs application"```

You should also create a new repository on GitHub and add it as a remote. *Git flow is outside the scope of this walkthrough but do make use of version control when working on this project.*


### Run the application

In your terminal run the following command to start a local server and run the application

```$ ionic serve --lab ```

A browser window will open and you'll be presented with a view of both the iOS and the Android version of the application. Pretty cool, right?

Image≈≈≈≈

## Adding a new view
We are going to remove our home page and add a new view called calculator.

Start by creating a new branch, called calculator

``` $ git checkout -b calculator ```

then navigate to src/pages


Delete the "home" folder.

img

Then navigate to src/app/app.module.ts.

``` src/app/app.module.ts ```

Remove HomePage from Declarations and entry components. *These are basically the stack of pages that is available to the ionic app. They are placed in a stack and not in routes as ionic 1.*

And since we are dealing with components, we are going to remove the import of homepage also.

After that, navigate to src/pages/tabs.ts

``` src/pages/tabs.ts ```

Here we are going to remove the tab1root, which is the HomePage. Since we don’t have it anymore. You can also remove the import of homepage since we don’t have it anymore.

img

We are also going to remove the tab1root in the tabs.html file.

picture

### Adding the calculator tab

Ionic 2 lets us generate our pages, (like scaffolds of certain views)

to add our calculator page run this command in your terminal:

```$ ionic g page calculator```

A new folder has now been created in the pages folder. Check it out! :)

You can enter the calculator.ts file and remove thees lines

```public navCtrl: NavController, public navParams: NavParams```

from the constructor

---

Now we need to navigate to src/app/app.module.ts.

``` src/app/app.module.ts ```

and import the new page we created. Like this:

```import { Calculator } from '../pages/calculator/calculator'```

And then include it in the declaration and entry components

image

In order to add it to our tab menu we need to navigate to: src/pages/tabs.ts

``` src/pages/tabs.ts ```

and import it like this:

```import { Calculator } from '../calculator/calculator'```

We are also going to add a new tab. like this

calculatorTab: any = Calculator;

*we can also rename the other to make them more readable*


your tabs.ts should look like this:

```
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
```

now navigate to tabs.html and add the new tab.


Your code should look something like this after you are done:

```
<ion-tabs> 
  <ion-tab [root]="calculatorTab" tabTitle="Calculator" tabIcon="calculator">
  </ion-tab> 
  <ion-tab [root]="aboutTab" tabTitle="About" tabIcon="information-circle">
  </ion-tab>   <ion-tab [root]="contactTab" tabTitle="Contact" tabIcon="contacts">
  </ion-tab>
 </ion-tabs> 
```
Now you can see that made all the tab roots more readable.


If you want you can now check the ionic server and see how it looks like! You remember how to do that? :)

### Adding functionality.

We are going to use the code you wrote during your second week of the bootcamp and modify it.

First of all we are going to go to the view and add our input fields!

in ```src/pages/calculator/calculator.html```

add this:

```<ion-item>
    <ion-input type="number" placeholder="Weight" [(ngModel)]="weight"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input type="number" placeholder="Height" [(ngModel)]="height"></ion-input>
  </ion-item>

  <button (click)="doCalculateBmi()" ion-button>Calculate</button>
```
inside the ```<ion-content>``` tags



Now we need to go to our calculator controller (calculator.ts)

``` src/pages/calculator/calculator.ts ```

Here we are going to create two new variables which we will use to get the information from our view! height and weight should be added on top of the class, as you can see we need to declare the data types of these variables, which we already know will be numbers.

```
....
export class Calculator {
  height: number;
  weight: number;
....
```

We are also going to add a new method called ```doCalculateBmi()```

your controller should look like this when you are done.

``` src/pages/calculator/calculator.ts ```
```
import { Component } from '@angular/core';

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class Calculator {
  height: number;
  weight: number;

  constructor() {
  }

  doCalculateBmi(){

  }
}
```

#### The logic

Now we need to add the logic to this app, where the actual calculation will be made.

The first thing you are going to do is to create a new provider. A provider plays a very important role in providing information to our application and performing tasks for us.

Start by running this in your terminal:

```$ ionic g provider bmiCalculator```

this generates a provider in your provider folder called BmiCalculator.

first of all, include that provider into your main module

Navigate to that provider and remove

``` src/providers/calculator.ts ```

``` import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; ```

from the imports and

``` public http: Http ```

from the constructor,

This is because we wont touch upon http request in this task!

The next thing you will do is to create a new method in that provider called calculateBmi, and add your bmi clalculation to it. Keep in mind, look at the code below and see the differences compared to what you wrote during week 2.

add this to your provider inside the class tags:

``` src/providers/calculator.ts ```

```
calculateBmiMetric(obj) {
  var weight = obj.weight;
  var height = obj.height;
  if (weight > 0 && height > 0) {
    var finalBmi = weight / (height / 100 * height / 100);
    obj.bmiValue = parseFloat(finalBmi.toFixed(2));
    this.setBMIMessage(obj);
    return obj
  }
};

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
```

What we want to do now is to display the output this calculation does on the view.

But first we need to head to the controller and make a few additions.

The provider is available to us as long as we import it and add it to our dependencies in the constructor.

in ``` src/pages/calculator.ts ```

add

``` import { BmiCalculator } from '../../providers/bmi-calculator'; ```

to the top.

and then add ``` private calculatorProvider: BmiCalculator ``` to the constructor dependencies.

we also need to add a new variable called person in order to use our provider the way we want to.

add person: any; right under the weight and height variables.

So your file look like this:

```
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

  }
}

```

now we are able to run methods from our bmi calculator provider by running: ``` this.calculatorProvider.calculateBmiMetric() ```

cool huh?

so we will add that to our doCalculate method. including setting up an object with the weight and height we send in from the view.
add these lines to your ``` doCalculateBmi() ``` method.

```
let personObject = { weight: this.weight, height: this.height }
this.person = this.calculatorProvider.calculateBmiMetric(personObject)
```

As you can see we are now running the calculate method with and object using the height and weight from the view. We are then setting a person variable to the output of the provider method.

We are almost done.

The only thing we need now is to display the results of the calculation in the view.

navigate to calculator.html and add these lines underneath the input fields, inside the <ion content> tags

```
............
<div *ngIf="person">
    <ion-card>
      <ion-card-header>
        BMI Calculation
      </ion-card-header>
      <ion-card-content>
        <p>Person: Weight {{person.weight}} kg, Height {{person.height}} cm</p>
        <p>BMI: {{person.bmiValue}}</p>
        <p><strong>You are {{person.bmiMessage}}</strong></p>
      </ion-card-content>
    </ion-card>
  </div>
<ion-content>
  ```

The way the above code works is that it wont display anything until we have a result from the calculator. This is through the *ngIf="person". Since person is the object which will return from the calculator it wont exist until the calculation is done.

Then we display the different attriutes of the person through angular expressions (example: {{person.bmiValue}}). So this basically is how we pass information from our controller to our view, pretty similar to rails right? :)

Now you can try and run the ionic server and see how it looks like and if it works the way we want it to!

### Wrapping up

We have only touched upon the surface of the ionic framework and there is lots of more cool stuff you can do with it. But you now should have a basic understanding of it and you should be able to continue building more cool features.

Now I will leave it up to you to continue and explore the framework. Add a new feature, or add a cool design to the app. You decide.
I recommend that you skim through the [Ionic documentation] (http://ionicframework.com/docs/) and see what else you can add to your app. You probably could find some inspiration there.
