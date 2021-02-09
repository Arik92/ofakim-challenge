import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  mockName: string = 'arik';
  mockPass: string = '1234';
  apiUserName: string = '';
  apiPass: string = '';
  constructor(private router: Router) { }

  ngOnInit() {   
    this.generateUser();  
  }

  generateUser(): void {
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(json => {
      this.apiUserName = json.username;
      this.apiPass = this.generatePass(this.apiUserName);
    });
  }
  

  generatePass(userName: string): string {
    // generate a password according to the user's user name 
    const userNameArray = userName.split('');
    const pass = this.shuffleArray(userNameArray).join('');
    return pass
  }

  shuffleArray(array: string[]): string[] { // create randomized string array out of another string array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  validateLoginInput(userName: string, passWord: string): string {
    const patt = new RegExp('[^a-zA-Z0-9]'); // any character that is not a letter or a number. can be modified
    let msg = 'valid';
    
    if (userName.localeCompare('') === 0) {
      msg = 'Please Enter A User Name';
    } else if (passWord.localeCompare('') === 0) {
      msg = 'Please Enter A Password';
    } else if (patt.test(userName) || (patt.test(passWord))) {
      msg = 'Please Enter English characters and numbers only!';
    }
    return msg;
  }

  validateLoginCredentials(userName: string, passWord: string): boolean {
    let res = false;
    if ((userName.localeCompare(this.mockName) === 0) && (passWord.localeCompare(this.mockPass) === 0)) {
      res = true;
    } else if ((userName.localeCompare(this.apiUserName) === 0) && (passWord.localeCompare(this.apiPass) === 0))    {
      res = true;
    }
    return res;
  }

  login(form: NgForm): void {        
    const userName = form.value.userName;
    const pass = form.value.pass;
    const loginMsg = this.validateLoginInput(userName, pass);

    if (loginMsg.localeCompare('valid') === 0) { // input is valid
      if (this.validateLoginCredentials(userName, pass)) {
        this.router.navigate(['dashboard/'+userName]);
      } else {
        alert('Please Check Your Login Details');
      }
    } else {
      alert(loginMsg);
    }
  }

}
