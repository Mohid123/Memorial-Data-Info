import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiPreviewDialogService } from '@taiga-ui/addon-preview';
import { TuiDialogContext } from '@taiga-ui/core';
import { UserService } from '../user.service';
import { Observable, pluck, switchMap } from 'rxjs';

@Component({
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  clientInfo: Observable<any>
  @ViewChild('preview')
    readonly preview?: TemplateRef<TuiDialogContext>;

  constructor(
    @Inject(TuiPreviewDialogService) private readonly previewDialogService: TuiPreviewDialogService,
    private user: UserService,
    private activatedRoute: ActivatedRoute
  )
  {
    this.clientInfo = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((val => this.user.getClientInfoById(val)))
    );
  }

  show() {
    this.previewDialogService.open(this.preview).subscribe();
  }
}
