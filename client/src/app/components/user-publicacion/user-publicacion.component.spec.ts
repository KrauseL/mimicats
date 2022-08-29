import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPublicacionComponent } from './user-publicacion.component';

describe('UserPublicacionComponent', () => {
  let component: UserPublicacionComponent;
  let fixture: ComponentFixture<UserPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
