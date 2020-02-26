import { Injectable } from '@angular/core';
import { SnackbarType } from '../enums/snackbar-type.enum';
import { Type } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor( private snackBar: MatSnackBar) { }

  openSnackbar(message: string, action: string, durationTime: number, type: SnackbarType) {
    switch (type) {
      case SnackbarType.Error: {
        this.snackBar.open(message, action, {
          duration: durationTime,
          panelClass: ['snackbar-error']
        });
      }
    }
  }
}
