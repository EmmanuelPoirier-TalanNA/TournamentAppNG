import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take, takeLast } from 'rxjs';
import { Player } from '../_models/player.model';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]', // *appHasRole='["Admin", "Thing"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  player: Player = {} as Player;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.currentPlayer$.pipe().subscribe({
      next: (player) => {
        if (player) {
          this.player = player;
          this.checkRole(player);
        }
      },
    });
  }

  checkRole(player: Player) {
    if (this.appHasRole.includes(this.player?.role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
