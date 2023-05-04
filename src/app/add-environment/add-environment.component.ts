import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-environment',
  templateUrl: './add-environment.component.html',
  styleUrls: ['./add-environment.component.scss'],
})
export class AddEnvironmentComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEnvironmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form = new FormGroup({
    actions: new FormControl(''),
    environment: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    exclusions: new FormControl(''),
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddEnvironment(): void {
    this.dialogRef.close(this.form.value);
  }
}
