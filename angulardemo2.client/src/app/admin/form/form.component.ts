import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  submittedData: any;
  file: File | null = null;

  // Handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      this.submittedData = {
        ...form.value,
        profilePic: this.file ? this.file.name : null
      };
      console.log('Form Submitted!', this.submittedData, this.file?.size);
    } else {
      console.log('Form is invalid');
    }
  }

  // Handle file selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
