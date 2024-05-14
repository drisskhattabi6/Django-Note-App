
const addBtn = document.querySelector("#createBtn");
const notesContainer = document.querySelector(".notes");

const allNotes = document.querySelectorAll(".note")
let notesNumber = allNotes.length

const headerColor = ["rgb(182, 7, 182)", "rgb(213, 219, 35)", "#047C51","#F62915", "#F4770B", "#0640A7"]
var colorIndex = 0

function verify() {

    allNotes.forEach(note => {
        const header = note.querySelector(".header");
        const saveBtn = note.querySelector(".savedit");
        const delBtn = note.querySelector(".delete");
        const textarea = note.querySelector("textarea");

        if (saveBtn.classList.contains("edit")) { 
            textarea.disabled = true;
            // note.setAttribute('data-save','1')
        }
        if (saveBtn.classList.contains("save")) { 
            textarea.disabled = false;
            // note.setAttribute('data-save','0')
        }

        header.style.backgroundColor = headerColor[colorIndex]
        // colorIndex++;
        if (++colorIndex == headerColor.length) colorIndex = 0


        saveBtn.addEventListener("click", function () {
            if (saveBtn.classList.contains("save")) {
                if(textarea.value != "") {
                    // textarea.innerHTML = marked.parse(textarea.value); 
                    textarea.disabled = true;
                    // note.setAttribute('data-save','1')
                    saveBtn.parentNode.setAttribute('name','save')
                    // alert(111);
                    saveBtn.classList.remove("save");
                    saveBtn.classList.add("edit");
                    saveBtn.classList.remove("fa-floppy-disk");
                    saveBtn.classList.add("fa-edit");
                    note.classList.add("saved")
                    note.classList.remove("unsaved")
                    return;
                } else {
                    alert("You must type in note to save it!!!")
                    return
                }
            }
        
            if (saveBtn.classList.contains("edit")) {
                textarea.disabled = false;
                saveBtn.parentNode.setAttribute('name','edit')
                // alert(222)
                saveBtn.classList.remove("edit");
                saveBtn.classList.add("save");
                saveBtn.classList.remove("fa-edit");
                saveBtn.classList.add("fa-floppy-disk");
                note.classList.add("unsaved")
                note.classList.remove("saved")
                return;
            }
        });

        delBtn.addEventListener("click", function () { 
            note.classList.add("delete-note")
            setTimeout(()=>{
                note.remove() 
            }, 1000)
        });
    });
}

verify()

// this function for verifie if all older notes are saves
function isAllSave() {
    let n = 0;
    let notes = document.querySelectorAll(".note");

    if (notes.length == 0) return 0

    for (let i = 0 ; i < notes.length ; i++)
        if (notes[i].dataset.save == 0) 
            n++

    return n;
} 

// add new note function.
addBtn.addEventListener("click", function () {
    /* let n = isAllSave()
    if( n !== 0 ) {
        alert("you must save all older notes to create a new note")
        return
    } */

    let noteContent = 
        `
            <div class="header flex-sp-bet">
                    <h2 title="create_at ?">Note ${++notesNumber}</h2>
                    <div class="flex-center">
                        <button type="submit" name="save" class="btn submit-btn"><i class="fa-solid fa-floppy-disk save savedit" title="save/edit"></i></button>
                        <button type="submit" name="delete" class="btn submit-btn"><i class="fa-solid fa-trash delete" title="delete"></i></button>
                    </div>
            </div>
            <div class="text">
                    <textarea placeholder="write your note..."></textarea>
            </div> 
        `
        //{% csrf_token %}

    let noteForm = document.createElement("form");
    noteForm.className = "note unsaved crud-form";
    noteForm.innerHTML = noteContent;
    noteForm.setAttribute('data-note-id','0')
    noteForm.setAttribute('method','post')
    noteForm.setAttribute('action','')
    noteForm.style.backgroundColor = headerColor[colorIndex]
    if (++colorIndex == headerColor.length) colorIndex = 0

    const saveBtn = noteForm.querySelector(".savedit");
    const delBtn = noteForm.querySelector(".delete");
    const textarea = noteForm.querySelector("textarea");
    // console.log(saveBtn.parentNode, delBtn.parentNode);

    saveBtn.addEventListener("click", function () {
        if (saveBtn.classList.contains("save")) {
            if(textarea.value != "") {
                // textarea.innerHTML = marked.parse(textarea.value); 
                textarea.disabled = true;
                // noteDiv.setAttribute('data-save','1')
                saveBtn.parentNode.setAttribute('name','save')
                saveBtn.classList.remove("save");
                saveBtn.classList.add("edit");
                saveBtn.classList.remove("fa-floppy-disk");
                saveBtn.classList.add("fa-edit");
                noteForm.classList.add("saved")
                noteForm.classList.remove("unsaved")
                return;
            } else {
                alert("you must type in note to save it.")
                return
            }
        }
    
        if (saveBtn.classList.contains("edit")) {
            textarea.disabled = false;
            saveBtn.parentNode.setAttribute('name','edit')
            saveBtn.classList.remove("edit");
            saveBtn.classList.add("save");
            saveBtn.classList.remove("fa-edit");
            saveBtn.classList.add("fa-floppy-disk");
            noteForm.classList.add("unsaved")
            noteForm.classList.remove("saved")
            return;
        }
    });

    delBtn.addEventListener("click", function () { 
        noteForm.classList.add("delete-note")
        setTimeout(()=>{
            noteForm.remove() 
        }, 700)
    });

    notesContainer.appendChild(noteForm);
});
