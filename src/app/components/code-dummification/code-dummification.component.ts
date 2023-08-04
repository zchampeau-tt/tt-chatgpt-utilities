import { Component } from '@angular/core';
import { CodeDummificationService } from "../../services/code-dummification.service";
import { ChatGptService } from "../../services/chat-gpt.service";
import { Clipboard } from "@angular/cdk/clipboard";
import { ToastService } from "@tylertech/forge-angular";
import {IColumnConfiguration} from "@tylertech/forge";

@Component({
  selector: 'code-dummification',
  templateUrl: './code-dummification.component.html',
  styleUrls: ['./code-dummification.component.scss']
})
export class CodeDummificationComponent {
  protected columnConfigurations : IColumnConfiguration[] = [
    {
      property: 'value',
      header: 'Masked',
    },
    {
      property: 'key',
      header: 'Actual',
    },
  ];
  protected gptFetching = false;
  protected gptFetched = false;
  protected data: {key: string, value: string}[] = [];
  protected inputPrompt = '';
  protected inputCode = '';

  protected gptInput = '';
  protected gptOutput = '';

  public copy(): void {
    this._clipboard.copy(this.inputCode);
    const toast = this._toastService.show({
      message: 'Copied code to clipboard!',
      actionHandler: () => toast.hide(),
      placement: 'bottom',
      duration: 4000,
    });
  }

  // TODO: before recording, remove the default code portion on the home page
  public paste(): void {
    navigator.clipboard.readText().then((content) => {
      this.inputCode = content;
      const toast = this._toastService.show({
        message: 'Pasted code from clipboard!',
        actionHandler: () => toast.hide(),
        placement: 'bottom',
        duration: 4000,
      });
    });
  }

  public dummify(): void {
    if (this.inputCode.length === 0){
      const toast = this._toastService.show({
        message: 'Code Portion is incomplete!',
        actionHandler: () => toast.hide(),
        placement: 'bottom',
        duration: 4000,
      });
      return;
    }

    this.inputCode = this._codeDummifier.dummify(this.inputCode);
    this.data = this._codeDummifier.getMap();

    const toast = this._toastService.show({
      message: 'Code masked!',
      actionHandler: () => toast.hide(),
      placement: 'bottom',
      duration: 4000,
    });
  }

  public smartify(): void {
    this.gptOutput = this._codeDummifier.smartify(this.gptOutput);

    const toast = this._toastService.show({
      message: 'Response unmasked!',
      actionHandler: () => toast.hide(),
      placement: 'bottom',
      duration: 4000,
    });
  }

  public submit(): void {
    if (this.inputCode.length === 0 || this.inputPrompt.length === 0){
      const toast = this._toastService.show({
        message: 'Fields are incomplete!',
        actionHandler: () => toast.hide(),
        placement: 'bottom',
        duration: 4000,
      });
      return;
    }
    this.gptFetched = true;
    this.gptFetching = true;
    this.gptInput = `${this.inputPrompt}: ${this.inputCode}\nOptions: [without_name_refactoring] [add_comments]`;
    const messages = [
      { role: 'user', content: this.gptInput }
    ];

    this._chatGPT.getGptResponse(messages).subscribe(
      (response) => {
        this.gptOutput = response.choices[0].message.content;
        this.gptFetching = false;
      },
      (error) => {
        console.error('Error making the OpenAI API request:', error.message);
        this.gptFetching = false;
      }
    );

    const toast = this._toastService.show({
      message: 'Submitting prompt to ChatGPT!',
      actionHandler: () => toast.hide(),
      placement: 'bottom',
      duration: 4000,
    });
  }

  constructor(private _codeDummifier: CodeDummificationService,
              private _chatGPT: ChatGptService,
              private _clipboard: Clipboard,
              private _toastService: ToastService) {}
}
