package com.notes.operation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.notes.operation.model.Note;
import com.notes.operation.repository.NoteRepository;

@Service
public class NoteService {

	@Autowired
	private NoteRepository noteRepository;

	public Note save(Note notes) {
		return noteRepository.save(notes);
	}

	public List<Note> findByEmail(String email) {

		return noteRepository.findByEmail(email);
	}

	public void deleteById(int note_id) {
		noteRepository.deleteById(note_id);

	}

}
