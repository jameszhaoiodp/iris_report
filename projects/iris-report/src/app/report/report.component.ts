import {Component, Input, OnInit, VERSION} from '@angular/core';
import {

  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from "@angular/forms";

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
  datePattern = '/^([0-9]{2})\\/([0-9]{2})\\/([0-9]{4})$/';
  protected dateForm!: FormGroup<DateRange>;
  protected diffHoursTooBig = false;


  constructor(private fb: NonNullableFormBuilder  ) {

  }

  ngOnInit() {
    this.dateForm = this.fb.group({
      startDate: ['', [
        Validators.required
      ]],
      startTime: ['0:0:0'],
      endDate: ['', Validators.required ],
      endTime: ['0:0:0'],
    });


    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    let ddString = '';
    if (dd < 10) {
      ddString = '0' + dd;
    }

    let mmString = '';
    if (mm < 10) {
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
    this.dateForm.setValue(init);
  }


  get_report(startDate: string, endDate: string) {


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
    console.log('startDate', this.dateForm.controls.startDate.value);
    console.log('startTime', this.dateForm.controls.startTime.value);


    console.log(form.value);

    // const startDate = "29/4/2023 23:50:00";
    // const endDate = "30/4/2023 0:01:00";  //auto -5

    // const startDate = this.dateForm.controls.startDate.value;
    // const endDate = this.dateForm.controls.endDate.value;
    //
    // const startTime = this.dateForm.controls.startTime.value;
    // const endTime = this.dateForm.controls.startTime.value;
    //
    // const startDateTime = new Date(startDate +' ' + startTime);
    // console.log(startDateTime.toString());
    // const endDateTime = new Date(endDate +' ' + endTime);
    //
    // // this.validateDate(startDate);
    // // this.validateDate(startDate);
    //
    // const diff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / 3600000;
    //
    //     this.diffHoursTooBig = diff>4;


    // this.get_report(startDate, endDate);

  }

  validateDate(date: string) {
    const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return pattern.test(date)
  }

  validateTime(time: string){
    //const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const pattern = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
    return pattern.test(time)
  }

  get isDiffHoursTooBig(){

    const startDate = this.dateForm.controls.startDate.value;
    const startTime = this.dateForm.controls.startTime.value;
    const startDateTime = new Date(startDate +' ' + startTime);

    const endDate = this.dateForm.controls.endDate.value;
    const endTime = this.dateForm.controls.endTime.value;

    const endDateTime = new Date(endDate +' ' + endTime);

    const diff = Math.abs(endDateTime.getTime() - startDateTime.getTime()) / 3600000;

    return diff>4;
  }
  get isEndDateBiggerStartDate(){

    const startDate = this.dateForm.controls.startDate.value;
    const startTime = this.dateForm.controls.startTime.value;
    const startDateTime = new Date(startDate +' ' + startTime);

    const endDate = this.dateForm.controls.endDate.value;
    const endTime = this.dateForm.controls.endTime.value;

    const endDateTime = new Date(endDate +' ' + endTime);

    console.log(endDateTime.getTime() );
    console.log(startDateTime.getTime() );

    return   endDateTime.getTime() - startDateTime.getTime();
  }


  get startDate() {
    return this.validateDate(this.dateForm.controls.startDate.value)
  }
  get endDate() {
    return this.validateDate(this.dateForm.controls.endDate.value)
  }

  get startTime() {
    return this.validateTime(this.dateForm.controls.startTime.value)
  }
  get endTime() {
    return this.validateTime(this.dateForm.controls.endTime.value)
  }

  get isFormValid(){
    return this.startDate&& this.endDate&&this.startTime&&this.endTime;
  }
}
