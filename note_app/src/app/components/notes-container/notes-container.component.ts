import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.css']
})
export class NotesContainerComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  searchQuery: string = '';
  categories: string[] = ['Personal', 'Work', 'Ideas', 'Tasks'];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });

    this.notesService.getSelectedNote().subscribe(note => {
      this.selectedNote = note;
    });
  }

  onCreateNote() {
    this.notesService.createNote('New Note', '', 'Personal');
  }

  onSelectNote(note: Note) {
    this.notesService.selectNote(note);
  }

  onUpdateNote() {
    if (this.selectedNote) {
      this.notesService.updateNote(this.selectedNote);
    }
  }

  onDeleteNote(id: string) {
    this.notesService.deleteNote(id);
  }

  onSearch() {
    this.notesService.searchNotes(this.searchQuery);
  }
}
