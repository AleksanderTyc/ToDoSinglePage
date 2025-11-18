console.log('ToDo List');

// (document.getElementsByTagName("body"))[0].addEventListener('onload', () => {
//     console.log("*** DIAG *** Body has loaded");
// });

function executeOnLoad() {
    const addNew = document.getElementById('btn-new');
    addNew.addEventListener('click', onNewClick );

    // This is wrong - we assume that the order in the collection is the same as the order of id.
    const allForms = document.getElementsByClassName("entry-form");
    for (let index = 0; index < allForms.length; index++) {
        allForms[index].style.display = 'none';
    }
    const allHeads = document.getElementsByClassName("entry-head");
    for (let index = 0; index < allHeads.length; index++) {
        allHeads[index].addEventListener('click', () => onClickOnHead(index));
    }
    const allDismiss = document.getElementsByClassName("btn-dsm");
    for (let index = 0; index < allDismiss.length; index++) {
        allDismiss[index].addEventListener('click', () => onOKCancelClick(index,false));
    }
    const allSave = document.getElementsByClassName("btn-save");
    for (let index = 0; index < allSave.length; index++) {
        allSave[index].addEventListener('click', () => onOKCancelClick(index,true));
    }
}

function onClickOnHead(headIndex) {
    console.log(`*** DIAG *** Called at line ${headIndex}`);
    const currHead = document.getElementById(`entry-head-${headIndex}`);
    currHead.style.display = 'none';
    const currForm = document.getElementById(`entry-form-${headIndex}`);
    currForm.style.display = 'block';
}

function onOKCancelClick(headIndex, buttonOK) {
    if( buttonOK) {
        console.log(`*** INFO *** Save changes clicked on ${headIndex}, saving data`);
    } else {
        console.log(`*** INFO *** Dismiss changes clicked on ${headIndex}, closing the form`);
    }
    const currHead = document.getElementById(`entry-head-${headIndex}`);
    currHead.style.display = 'block';
    const currForm = document.getElementById(`entry-form-${headIndex}`);
    currForm.style.display = 'none';
}

function onNewClick() {
    console.log("*** INFO *** + clicked, adding New Task");
}

