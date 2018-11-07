import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public submitted = false;
  contactForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    message: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private af: AngularFireDatabase) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.max(1000)]),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      this.showSuccess();

      const {name, email, message} = this.contactForm.value;

      const formRequest = {name, email, message};
      this.af.list('/messages').push(formRequest);

      this.contactForm.reset();
    }
  }

  showSuccess() {
    this.toastr.success('Your email is on its way!', 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }
}

