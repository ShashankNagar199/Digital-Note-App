package com.notes.operation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notes.operation.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

	List<Note> findByEmail(String user_email);

}
