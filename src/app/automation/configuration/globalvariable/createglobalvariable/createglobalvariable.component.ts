import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SelectModel } from "../../../../commons/SelectModel";

@Component({
  selector: "app-createglobalvariable",
  templateUrl: "./createglobalvariable.component.html",
  styleUrls: ["./createglobalvariable.component.scss"],
})
export class CreateGlobalVariableComponent implements OnInit {
  globalValueTypes: SelectModel[];
  globalvariableform: FormGroup;
  constructor() {
    this.globalvariableform = new FormGroup({
      key: new FormControl(""),
      value: new FormControl(""),
      valueType: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.globalValueTypes = [
      { key: "KeyAndValue", value: "keyandvalue" },
      { key: "File", value: "file" },
    ];
  }
}
