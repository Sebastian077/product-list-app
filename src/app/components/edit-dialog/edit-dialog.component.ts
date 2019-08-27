import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHandlerService } from '../../services/http-handler.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  productForm = new FormGroup({
    productName: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  })
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpHandlerService
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const updateData = {
      price: this.productForm.get('price').value,
      name: this.productForm.get('productName').value,
      id: this.data.productId,
      isArchived: false,
      description: this.productForm.get('description').value
    }
    const updateProduct = this.http.updateProduct(updateData);
    updateProduct.subscribe(response => {
      if (response) {
        this.dialogRef.close(true);
      }
    })
  }
}
