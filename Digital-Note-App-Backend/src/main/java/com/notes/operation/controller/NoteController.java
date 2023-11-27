package com.notes.operation.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.operation.model.Note;
import com.notes.operation.repository.NoteRepository;
import com.notes.operation.service.NoteService;

@RestController
@RequestMapping("/note")
@CrossOrigin("*")
public class NoteController {

	@Autowired
	private NoteService noteService;

	@Autowired
	private NoteRepository noteRepository;

	// saving a note
	@PostMapping("/save/{email}")
	public Note saveNote(@PathVariable String email, @RequestBody Note note) {
		note = noteService.save(note);
		note.setEmail(email);
		return noteService.save(note);
	}

	// get all notes having unique email
	@GetMapping("/getallnotes/{email}")
	public List<Note> getNotebyEmail(@PathVariable String email) {

		return noteService.findByEmail(email);

	}

	// get all notes by ID
	@GetMapping("/getallnotesId/{id}")
	public Optional<Note> getNotebyId(@PathVariable int id) {

		return noteRepository.findById(id);

	}

	// Delete note by specific id
	@DeleteMapping("/deletenote/{id}")
	public String Delete(@PathVariable String id) {
		try {
			int note_id = Integer.parseInt(id);
			noteService.deleteById(note_id);
			return "Deletion Success";
		} catch (Exception e) {
			return "CannotDelete";
		}

	}

	// update a specific note
	@PutMapping("/updatenote/{id}")
	public String UpdateNote(@PathVariable String id, @RequestBody Note note) {

		int note_id = Integer.parseInt(id);
		Optional<Note> user1 = noteRepository.findById(note_id);
		Note u = new Note();
		u = user1.get();

		u.setTitle(note.getTitle());
		u.setContent(note.getContent());
		noteRepository.save(u);

		return "UpdatedResult";

	}
}
