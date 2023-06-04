import {Component, Input, OnInit, VERSION} from '@angular/core';
import {  FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
// import {ServiceService} from "./service.service";
import {environment} from "../../environments/environment";

export interface DateRange {
  startDate: FormControl<string>;
  startTime: FormControl<string>;
  endDate: FormControl<string>;
  endTime: FormControl<string>;

}
@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  protected myForm!: FormGroup<DateRange>;
  constructor(private fb: NonNullableFormBuilder ) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      startDate: ['', [
        Validators.required,

      ]],
      startTime: ['0:0:0'],
      endDate: ['', Validators.required],
      endTime: ['0:0:0'],
    });



    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    let ddString='';
    if (dd < 10) {
      ddString = '0' + dd;
    }

    let mmString ='';
    if (mm < 10){
      mmString = '0' + mm;
    }

    const formattedToday = ddString + '/' + mmString + '/' + yyyy;
    console.log(formattedToday);

    let init = {
      startDate: formattedToday,
      startTime: '0:0:0',
      endDate: formattedToday,
      endTime: '0:0:0',
    }
    this.myForm.setValue(init);
  }

  get_report(startDate: string, endDate: string){


    let url = environment.serverUrl + '/limsR/IRISNavigationGet-ServiceTest?startdate=29/4/2023 23:50:00&enddate=30/4/2023 0:01:00';


    var fileName = "IRis" + ".csv";
    var link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    console.log(" ready to fire link ");
    link.click();
    document.body.removeChild(link);

  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('startDate',  this.myForm.controls.startDate.value);
    console.log('startTime', this.myForm.controls.startTime.value);


    console.log(form.value);

    const startDate = "29/4/2023 23:50:00";
    const endDate = "30/4/2023 0:01:00";  //auto -5
    this.get_report(startDate, endDate);

  }
}
