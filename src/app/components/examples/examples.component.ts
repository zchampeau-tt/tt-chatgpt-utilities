import { Component } from '@angular/core';
import { ToastService } from "@tylertech/forge-angular";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: 'code-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent {
  protected examples = [`using System;
using static Quartz.QuartzCronConverter;

class Program
{
    static void Main()
    {
        string quartzCronExpression = "0 0/5 * ? * *";
        string readableFormat = GetReadableFormat(quartzCronExpression);
        Console.WriteLine($"Readable format: {readableFormat}");
    }
}
`, `// I set data here. Execute is infact being called
public void Execute(IJobExecutionContext context)
{
    context.JobDetail.JobDataMap.PutAsString("lastAttempt", DateTime.Now);
}

// But when i call
// GetString() doesnt return anything even though its the same task
public string GetJobDataForTask(TaskDetail taskDetail)
{
    var jobDetail = JobBuilder.Create(typeof(TaskJob)).WithIdentity(taskDetail.TaskType.Name).Build();
    return jobDetail.JobDataMap.GetString("lastAttempt");
}`];

  public copy(index: number): void {
    this._clipboard.copy(this.examples[index]);
    const toast = this._toastService.show({
      message: 'Copied code to clipboard!',
      actionHandler: () => toast.hide(),
      placement: 'bottom',
      duration: 4000,
    });
  }

  public constructor(private _clipboard: Clipboard, private _toastService: ToastService) {
  }
}
