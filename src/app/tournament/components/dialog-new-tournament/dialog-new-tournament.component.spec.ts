import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTournamentComponent } from './dialog-new-tournament.component';

describe('DialogNewTournamentComponent', () => {
  let component: DialogNewTournamentComponent;
  let fixture: ComponentFixture<DialogNewTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
