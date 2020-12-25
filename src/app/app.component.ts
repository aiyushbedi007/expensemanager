import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';;
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'expensemanager';
  isSubmitted = false;
  isfSubmitted = false;
  flag= true;
  zflag= true;
  a;
  b;
  fname;
  fbutton="Add";
  // Currency Names
  Currency: any = ['USD', 'INR', 'GBP', 'YEN'];
  form: FormGroup;
  items;
  expenseForm;
  friendForm;
  types = [];
  friendsArray = [];
  expenses=[];
  getdata=[];
  fdata=[];
  type;
  friend;
  name;
  date;
  currency;
  amount;
  constructor( public formBuilder: FormBuilder) {
  }
  
  changeCurrency(e) {
    console.log(e.value)
    this.f.currency.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get f() { return this.expenseForm.controls; }

  get d() { return this.friendForm.controls; }


  getTypes() {
        return [
          { id: '1', name: 'Cash' },
          { id: '2', name: 'Debit Card' },
          { id: '3', name: 'Credit Card' },
          { id: '4', name: 'UPI' }
        ];
  }

  getFriends() {
    return JSON.parse(localStorage.getItem('friends'));
    // return [
    //   { id: '1', name: 'Ashu' },
    //   { id: '2', name: 'Sallo' },
    //   { id: '3', name: 'Rajat' },
    //   { id: '4', name: 'Dilsher' }
    // ];
}


  submit(){
    
    this.isSubmitted = true;
    if (this.expenseForm.invalid) {
      return false;
    } else {
      // console.log(this.expenseForm.value);
      this.expenses.push(this.expenseForm.value)
      localStorage.setItem('expense', JSON.stringify(this.expenses));
      this.getdata = JSON.parse(localStorage.getItem('expense'));
      console.log(JSON.stringify(this.expenseForm.value));
      console.log(this.getdata);
      this.expenseForm.reset();
      
    }
  }

  fsubmit(){
    let test =[];
    this.fbutton="Add"
    this.isfSubmitted = true;
    if (this.friendForm.invalid) {
      return false;
    } else {
      this.friendsArray.push(this.friendForm.value);
      console.log(this.friendsArray);
      localStorage.setItem('friends', JSON.stringify(this.friendsArray));
      this.fdata = JSON.parse(localStorage.getItem('friends'));
      console.log(this.fdata);
      this.friendForm.reset();
    }
  }

  onDelete(id){
    this.getdata.splice(id,1);
    localStorage.setItem('expense', JSON.stringify(this.getdata));
  }

  onEdit(id){
    this.name = id.name;
    this.friend=id.friends;
    this.type=id.types;
    this.date=id.date;
    this.currency=id.currency;
    this.amount=id.amount;
    this.flag = false;
    this.a = this.getdata.indexOf(id);
  }

  edit(){
    this.getdata[this.a].name = this.name;
    this.getdata[this.a].friends = this.friend;
    this.getdata[this.a].types = this.type;
    this.getdata[this.a].date = this.date;
    this.getdata[this.a].currency = this.currency;
    this.getdata[this.a].amount = this.amount;
    localStorage.setItem('expense', JSON.stringify(this.getdata));
    this.flag =true;
    this.expenseForm.reset();    
  }

  onDeleteFriend(id){
    // let temp =[];
    const a = this.fdata.indexOf(id);
    //this.fdata = JSON.parse(localStorage.getItem('friends'));
    this.fdata.splice(a,1);
    localStorage.setItem('friends', JSON.stringify(this.fdata));
    this.friendsArray=this.fdata;
    // this.fdata = JSON.parse(localStorage.getItem('friends'));
  }

  onEditFriend(id){ 
    this.fname = id.fname;
    this.zflag = false;
    this.b= this.fdata.indexOf(id);
  }

  fedit(){
    this.fdata[this.b].fname = this.fname;
    localStorage.setItem('friends', JSON.stringify(this.fdata));
    this.fdata = JSON.parse(localStorage.getItem('friends'));
    this.friendsArray=this.fdata;
    this.zflag = true;
    this.friendForm.reset(); 
  }

  ngOnInit() {
    //this.items = this.cartService.getItems();
    this.getdata = JSON.parse(localStorage.getItem('expense'));
    this.expenseForm = this.formBuilder.group({
      types:[''],
      currency: ['', Validators.required],
      name: ['', Validators.required],
      friends: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.fdata = JSON.parse(localStorage.getItem('friends'));
    this.friendForm = this.formBuilder.group({
      fname: ['', Validators.required]
    });


 
    of(this.getTypes()).subscribe(types => {
      this.types = types;
      this.expenseForm.controls.types.patchValue(this.types[0].id);
    });

    // of(this.getFriends()).subscribe(friends => {
    //   this.friendsArray = friends;
    //   this.expenseForm.controls.friends.patchValue(this.friendsArray[0].fname);
    // });
    
  }

  onSubmit(expenseData) {
    // Process expense data here
    //this.items = this.cartService.clearCart();
    this.expenseForm.reset();

    console.warn('Expense Has been Added', expenseData);
  }
}