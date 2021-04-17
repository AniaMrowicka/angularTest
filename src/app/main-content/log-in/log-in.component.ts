import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public authenticationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.authenticationForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('')
    });
  }
}
