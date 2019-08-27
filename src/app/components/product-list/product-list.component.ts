import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from '../../services/http-handler.service';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  faEdit = faEdit
  faArchive = faArchive

  constructor(
    private httpService: HttpHandlerService,
    private dialog: MatDialog
  ) { }
  
  productList = [];
  ngOnInit() {
    this.productList = [];
    const productListData = this.httpService.getProducts();
    productListData.subscribe(dataResponse => {
      for (const i of dataResponse['Items']) {
        this.productList.push(i);
      }
    });
  }

  editProduct(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.height = "auto";
    dialogConfig.autoFocus = false;
    dialogConfig.data = item;
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); 
      }
    });
  }
}
