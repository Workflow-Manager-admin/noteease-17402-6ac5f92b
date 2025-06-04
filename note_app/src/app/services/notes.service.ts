import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private selectedNoteSubject = new BehaviorSubject<Note | null>(null);

  constructor() {
    // Initialize with some sample data
    this.notes = [
      {
        id: '1',
        title: 'Welcome to NoteEase',
        content: 'This is your first note! Try creating, editing, or organizing your notes.',
        category: 'General',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.notesSubject.next(this.notes);
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  getSelectedNote(): Observable<Note | null> {
    return this.selectedNoteSubject.asObservable();
  }

  createNote(title: string, content: string, category?: string): void {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [newNote, ...this.notes];
    this.notesSubject.next(this.notes);
  }

  updateNote(note: Note): void {
    this.notes = this.notes.map(n => 
      n.id === note.id ? { ...note, updatedAt: new Date() } : n
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }

  selectNote(note: Note): void {
    this.selectedNoteSubject.next(note);
  }

  searchNotes(query: string): void {
    const filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    this.notesSubject.next(filteredNotes);
  }
}
