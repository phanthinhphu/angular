import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReaderService } from 'src/app/core/services/reader.service';
import { ReaderState, Reader } from 'src/app/core/models/reader.model';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CustomValidators } from 'src/app/share/customValidator';

import * as readerActions from '../store/reader.action';

@Component({
  selector: 'app-reader-form',
  templateUrl: './reader-form.component.html'
})

export class ReaderFormComponent implements OnInit {

  readerForm: FormGroup;
  id: string;
  title: string = 'CREATE';

  
  constructor(
    private fb: FormBuilder,
    private store: Store<ReaderState>,
    private readerService: ReaderService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.readerForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      phone: ['',
        [
          Validators.required,
          CustomValidators.checkNumber
        ]
      ]
    })

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('_id');
        if (!this.id) return false;

        this.title = 'UPDATE'
        this.readerService.getReader(this.id).subscribe(
          (res: any) => {
            const reader: Reader = res.reader;
            this.name.setValue(reader.name);
            this.address.setValue(reader.address);
            this.birthDay.setValue(reader.birthDay);
            this.phone.setValue(reader.phone);
          }
        )
      }
    )
  }

  saveReader(){
    if(this.readerForm.invalid) return false;

    let newReader : Reader = {
      name : this.name.value,
      address : this.phone.value,
      birthDay : this.birthDay.value,
      phone : this.phone.value
    }
    if(this.id){
      this.readerService.updateReader(this.id,newReader).subscribe(
        (res:any)=>{
          const reader : Reader = res.reader;
          const newReader = new readerActions.updateReader(reader);
          this.store.dispatch(newReader);
          if(res.success)
          this.notifier.notify('success','Success');
        },
        (error:any)=> this.notifier.notify('warning',error.error.message)
      )
    }else{
      this.readerService.createReader(newReader).subscribe(
        (res:any)=>{
          const reader : Reader = res.reader;
          const newReader = new readerActions.createReader(reader);
          this.store.dispatch(newReader);
          if(res.success)
            this.notifier.notify('success','Success');
          this.clearValueForm();
        },
        (error:any)=> this.notifier.notify('warning',error.error.message)
      )
    }

  }

  clearValueForm(){
    this.name.setValue('');
    this.address.setValue('');
    this.birthDay.setValue('');
    this.phone.setValue('');
  }

  get name() { return this.readerForm.get('name') };
  get address() { return this.readerForm.get('address') };
  get birthDay() { return this.readerForm.get('birthDay') };
  get phone() { return this.readerForm.get('phone') };

}
