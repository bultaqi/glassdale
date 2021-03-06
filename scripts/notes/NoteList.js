import {getNotes, useNotes, deleteNote} from "./NoteDataProvider.js"
import {Note} from "./Note.js"
import {getCriminals, useCriminals} from "../criminals/CriminalProvider.js"

//Function that will list all the notes that exist in the local server
export const NoteList = () => {
    getNotes()
    .then(getCriminals)
    .then(() => {
        const allTheNotes = useNotes()
        const allTheCriminals = useCriminals()

        const noteContainer = document.querySelector("#the-box")
        
        const arrayOfNotesWithCriminalNames = allTheNotes.map(singleNote => {

            const relatedCriminal = allTheCriminals.find(criminal => criminal.id === +singleNote.criminalId)
            const htmlString = Note(singleNote, relatedCriminal)

            return htmlString   
        })
        
        const StringOfAllNewNotes = arrayOfNotesWithCriminalNames.join("")

        noteContainer.innerHTML = StringOfAllNewNotes

        //this will erase the other content on the page when the notes are printed
        let criminalListContainer = document.querySelector(".criminal-list");
        criminalListContainer.innerHTML = ``;
        let facilityContainer = document.querySelector(".facility-list");
        facilityContainer.innerHTML = ``;
        let officerContainer = document.querySelector(".officer-list");
        officerContainer.innerHTML = ``;
    })
    
}

document.querySelector("#notes-nav-link").addEventListener("click", () => {
    // invoke the function that prints the criminals
    NoteList()
})


const eventHub = document.querySelector("#the-box")

eventHub.addEventListener("click", (eventObject) => {
  if (eventObject.target.id.startsWith("delete-note")) {
    const idToDelete = eventObject.target.id.split("--")[1]
    // ---------- Write your code here -------------//
    console.log(idToDelete)
    deleteNote(idToDelete) // Call the deleteNote function and pass in the appropriate id
    .then(NoteList) // Then call NoteList to refresh the list of notes
  }
});