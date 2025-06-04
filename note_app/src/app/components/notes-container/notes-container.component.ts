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
  public notes: Note[] = [];
  public selectedNote: Note | null = null;
  public searchQuery: string = '';
  public categories: string[] = ['Personal', 'Work', 'Ideas', 'Tasks'];

  constructor(private readonly notesService: NotesService) {}

  ngOnInit(): void {
    this.subscribeToNotes();
    this.subscribeToSelectedNote();
  }

  public subscribeToNotes(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  public subscribeToSelectedNote(): void {
    this.notesService.getSelectedNote().subscribe(note => {
      this.selectedNote = note;
    });
  }

  public onCreateNote(): void {
    this.notesService.createNote('New Note', '', 'Personal');
  }

  public onSelectNote(note: Note): void {
    this.notesService.selectNote(note);
  }

  public onUpdateNote(): void {
    if (this.selectedNote) {
      this.notesService.updateNote(this.selectedNote);
    }
  }

  public onDeleteNote(id: string): void {
    this.notesService.deleteNote(id);
  }

  public onSearch(): void {
    this.notesService.searchNotes(this.searchQuery);
  }
}
