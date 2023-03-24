import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { TuiPreviewDialogService } from '@taiga-ui/addon-preview';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  @ViewChild('preview')
    readonly preview?: TemplateRef<TuiDialogContext>;

  constructor(@Inject(TuiPreviewDialogService) private readonly previewDialogService: TuiPreviewDialogService) {}

  show() {
    this.previewDialogService.open(this.preview).subscribe();
  }
}
