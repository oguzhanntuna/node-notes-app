const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (duplicateNote) {
        console.log(chalk.red.inverse('Note title taken!'));
    } else {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);

    if (notes.length === newNotes.length) {
        console.log(chalk.red.inverse('No note found!'));
    } else {
        saveNotes(newNotes);
        console.log(chalk.green.inverse('Note removed!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes:'));

    if (notes.length === 0) {
        console.log('No note found!');
    } else {
        notes.forEach(note => console.log(note.title));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const specifiedNote = notes.find(note => note.title === title);

    if (specifiedNote) {
        console.log(chalk.inverse(specifiedNote.title));
        console.log(specifiedNote.body);
    } else {
        console.log(chalk.red.inverse('No note found?'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
    
        return JSON.parse(dataJSON);
    } catch (error) {

        return [];
    }
}

module.exports = { 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};