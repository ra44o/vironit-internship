import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {IUser, ICity} from '../../interfaces/interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() users: IUser[];
  @Input() cities: ICity[];

  @Output() created: EventEmitter<object> = new EventEmitter<object>();
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  formFlag = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      city_id: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  createUser(body: object): void {
    this.created.emit(body);
    this.formFlag = false;
    this.form.reset();
  }

  deleteUser(id: string) {
    this.deleted.emit(id);
  }

  closeCreateNewUserForm() {
    this.formFlag = false;
    this.form.reset();
  }
}
