import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as ace from 'ace-builds';
import * as jsbeauty from 'js-beautify';
import { SelectGroupModel } from '../models/SelectGroupModel';
import { SelectModel } from '../models/SelectModel';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent implements OnInit, AfterViewInit {
  htmlEditorControl = new FormControl();
  iframe!: HTMLElement;
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  aceEditor!: ace.Ace.Editor;
  selectGroupModels: SelectGroupModel[] = [
    {
      name: 'Bright',
      selectModels: [
        { text: 'Chrome', value: 'ace/theme/chrome' },
        { text: 'Clouds', value: 'ace/theme/clouds' },
        { text: 'Crimson Editor', value: 'ace/theme/crimson_editor' },
        { text: 'Dawn', value: 'ace/theme/dawn' },
        { text: 'Dreamweaver', value: 'ace/theme/dreamweaver' },
        { text: 'Eclipse', value: 'ace/theme/eclipse' },
        { text: 'GitHub', value: 'ace/theme/github' },
        { text: 'IPlastic', value: 'ace/theme/iplastic' },
        { text: 'Solarized Light', value: 'ace/theme/solarized_light' },
        { text: 'TextMate', value: 'ace/theme/textmate' },
        { text: 'Tomorrow', value: 'ace/theme/tomorrow' },
        { text: 'Xcode', value: 'ace/theme/xcode' },
        { text: 'Kuroir', value: 'ace/theme/kuroir' },
        { text: 'KatzenMilch', value: 'ace/theme/katzenmilch' },
        { text: 'SQL Server', value: 'ace/theme/sqlserver' },
      ],
    },
    {
      name: 'Dark',
      selectModels: [
        { text: 'Ambiance', value: 'ace/theme/ambiance' },
        { text: 'Chaos', value: 'ace/theme/chaos' },
        { text: 'Clouds Midnight', value: 'ace/theme/clouds_midnight' },
        { text: 'Dracula', value: 'ace/theme/dracula' },
        { text: 'Cobalt', value: 'ace/theme/cobalt' },
        { text: 'Gruvbox', value: 'ace/theme/gruvbox' },
        { text: 'Green on Black', value: 'ace/theme/gob' },
        { text: 'idle Fingers', value: 'ace/theme/idle_fingers' },
        { text: 'krTheme', value: 'ace/theme/kr_theme' },
        { text: 'Merbivore', value: 'ace/theme/merbivore' },
        { text: 'Merbivore Soft', value: 'ace/theme/merbivore_soft' },
        { text: 'Mono Industrial', value: 'ace/theme/mono_industrial' },
        { text: 'Monokai', value: 'ace/theme/monokai' },
        { text: 'Nord Dark', value: 'ace/theme/nord_dark' },
        { text: 'One Dark', value: 'ace/theme/one_dark' },
        { text: 'Pastel on dark', value: 'ace/theme/pastel_on_dark' },
        { text: 'Solarized Dark', value: 'ace/theme/solarized_dark' },
        { text: 'Terminal', value: 'ace/theme/terminal' },
        { text: 'Tomorrow Night', value: 'ace/theme/tomorrow_night' },
        { text: 'Tomorrow Night Blue', value: 'ace/theme/tomorrow_night_blue' },
        {
          text: 'Tomorrow Night Bright',
          value: 'ace/theme/tomorrow_night_bright',
        },
        {
          text: 'Tomorrow Night 80s',
          value: 'ace/theme/tomorrow_night_eighties',
        },
        { text: 'Twilight', value: 'ace/theme/twilight' },
        { text: 'Vibrant Ink', value: 'ace/theme/vibrant_ink' },
      ],
    },
  ];
  previewHtml!: SafeHtml;

  constructor(protected sanitizer: DomSanitizer) {
    // editor.setTheme('ace/theme/monokai');
    // editor.session.setMode('ace/mode/javascript');
  }
  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');

    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    ace.config.set(
      'modePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    ace.config.set(
      'themePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );

    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue(
      '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<style type="text/css">' +
        '</style>' +
        '</head>' +
        '<body>' +
        '<h1 style="color:red">Juhu Kinners</h1>' +
        '</body>' +
        '</html>'
    );
    this.aceEditor.session.setMode('ace/mode/html');
    this.aceEditor.session.setUseWrapMode(true);
  }

  ngOnInit(): void {}

  themeChange(selectModel: SelectModel): void {
    this.aceEditor.setTheme(selectModel.value);
  }

  formatContent(): void {
    var formatHtml = jsbeauty.html_beautify(this.aceEditor.getValue());
    this.aceEditor.setValue(formatHtml);
  }

  updatePreview(): void {
    if (this.aceEditorHasError()) {
      return;
    }
    this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.aceEditor.getValue()
    );
  }

  aceEditorHasError(): boolean {
    const annotations = this.aceEditor.getSession().getAnnotations();
    if (annotations.length === 0) {
      return false;
    }
    return true;
  }

  undo(): void {
    this.aceEditor
      .getSession()
      .getUndoManager()
      .undo(this.aceEditor.getSession());
  }
  redo(): void {
    this.aceEditor
      .getSession()
      .getUndoManager()
      .redo(this.aceEditor.getSession());
  }

  clear(): void {
    this.aceEditor.getSession().setValue('');
  }
}
