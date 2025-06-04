import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesContainerComponent],
  template: '<app-notes-container></app-notes-container>'
})
export class AppComponent {
  title = 'NoteEase';
}
