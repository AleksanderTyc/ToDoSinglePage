let myTasks;
let eventMode = -1;

function getData() {
    myTasks = JSON.parse(localStorage.getItem("myTasks")) || [{ title: "ab", details: "cd", due: "2025-11-19T13:33", status: "Complete" }];
}


function setInitialEventListeners() {
    const addNew = document.getElementById('btn-new');
    addNew.addEventListener('click', onNewClick);
    for (let index = 0; index < myTasks.length; index++) {
        setEventListenersOnIndex(index);
    }
}

function setEventListenersOnIndex(taskIndex) {
        const currTaskHead = document.getElementById(`entry-head-${taskIndex}`);
        currTaskHead.addEventListener('click', () => onClickOnHead(taskIndex));
        const currTaskBtnDsm = document.getElementById(`btn-dsm-${taskIndex}`);
        currTaskBtnDsm.addEventListener('click', () => onOKCancelClick(taskIndex, false));
        const currTaskBtnSave = document.getElementById(`btn-save-${taskIndex}`);
        currTaskBtnSave.addEventListener('click', () => onOKCancelClick(taskIndex, true));
}

function executeOnLoad() {
    getData();
    renderTasks();
    setInitialEventListeners();
    eventMode = -1;
}

function onClickOnHead(headIndex) {
    if (eventMode === -1) {
        console.log(`*** DIAG *** Called at line ${headIndex}`);
        const currHead = document.getElementById(`entry-head-${headIndex}`);
        currHead.style.display = 'none';
        const currForm = document.getElementById(`entry-form-${headIndex}`);
        currForm.style.display = 'block';
        eventMode = headIndex;
    }
}

function onOKCancelClick(headIndex, buttonOK) {
    const currForm = document.getElementById(`entry-form-${headIndex}`);
    if (buttonOK) {
        const currData = {
            title: document.getElementById(`txt-title-${headIndex}`).value,
            details: document.getElementById(`txt-dtls-${headIndex}`).value,
            due: document.getElementById(`dt-due-${headIndex}`).value,
            status: document.getElementById(`sel-status-${headIndex}`).value
        };
        console.log(`*** INFO *** Save changes clicked on ${headIndex}, saving data`);
        console.log(`*** INFO *** Save changes data object`, currData);
        console.log(`*** INFO *** Save changes END`);
        myTasks[headIndex] = currData;
        localStorage.setItem("myTasks", JSON.stringify(myTasks));
    } else {
        console.log(`*** INFO *** Dismiss changes clicked on ${headIndex}, closing the form`);
    }
    const currHead = document.getElementById(`entry-head-${headIndex}`);
    currHead.style.display = 'block';
    currForm.style.display = 'none';
    eventMode = -1;
}

function onNewClick() {
    if (eventMode === -1) {
        newTaskIndex = myTasks.length;
        console.log(`*** INFO *** + clicked, adding New Task index ${newTaskIndex}`);
        myTasks.push({ title: "", details: "", due: "", status: "Not started" });
        renderTasks();
        setEventListenersOnIndex(newTaskIndex);
        // format new Date() into 2025-11-19T13:33
    }
}
