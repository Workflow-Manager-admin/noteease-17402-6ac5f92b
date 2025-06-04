import { Component } from '@angular/core';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotesContainerComponent],
  template: '<app-notes-container></app-notes-container>'
})
export class AppComponent {
  title = 'NoteEase';
}
