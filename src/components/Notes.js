import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import './components.css'

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login")
    }


  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", edittitle: "", editdescription: "", edittag: "default" })
  const updateNote = (currentNote) => {
    setNote({ id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag });
    ref.current.click();

  }
  const handleClick = async (e) => {
    // console.log("note updated", note)
    ref.current.click();
    await editNote(note.id, note.edittitle, note.editdescription, note.edittag)
    props.showAlert("Note is updated Successfully", "success")


  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>


      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog addnote">
          <div className="modal-content note">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <form>
                <div className="mb-3 my-3 ">
                  <label htmlFor="edittitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" value={note.edittitle} onChange={onChange} minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="editdescription" name="editdescription" value={note.editdescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="edittag" name="edittag" value={note.edittag} onChange={onChange} />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button disabled={note.edittitle.length < 5 || note.editdescription.length < 5} type="button" className="btn btn-primary" onClick={() => { handleClick(note) }}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto row my-3">

        <h2>Your notes ({notes.length})</h2>
        <div className="container">

          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes?.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes