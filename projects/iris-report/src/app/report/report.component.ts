import {Component, Input, OnInit, VERSION} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ServiceService} from "./service.service";

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    startTime: new FormControl(''),
    endDate: new FormControl(''),
    endTime: new FormControl(''),
  });


  constructor(private fb: FormBuilder, private dataService: ServiceService) {

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
    this.dataService.getReport(startDate, endDate).subscribe((res : any)=>{
      console.log(res);
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('startDate', form.value.startDate);
    console.log('startTime', form.value.startTime);
    console.log('endDate', form.value.endDate);
    console.log('endTime', form.value.endTime);

    const startDate = "29/4/2023 23:50:00";
    const endDate = "30/4/2023 0:01:00";  //auto -5
    this.get_report(startDate, endDate);
  }
}
