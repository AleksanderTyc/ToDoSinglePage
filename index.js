let myTasks;
let eventMode = -1;

function getData() {
    myTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
}

function populateTasks() {
    myTasks.forEach((task, index) => {
        document.getElementById(`td-title-${index}`).innerHTML = task.title;
        document.getElementById(`td-due-${index}`).innerHTML = task.due;
        document.getElementById(`td-status-${index}`).innerHTML = task.status;
        document.getElementById(`txt-title-${index}`).value = task.title;
        document.getElementById(`txt-dtls-${index}`).value = task.details;
        document.getElementById(`dt-due-${index}`).value = task.due;
        const optionsMap = {
            ns: 'Not started', ip: 'In progress', cp: 'Complete', cn: 'Cancelled'
        };
        ['ns', 'ip', 'cp', 'cn'].forEach(taskStatus => {
            document.getElementById(`opt-${taskStatus}-${index}`).selected = (task.status === optionsMap[taskStatus]);
        });
    });
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
    populateTasks();
    setInitialEventListeners();
    eventMode = -1;
}

function onClickOnHead(headIndex) {
    if (eventMode === -1) {
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
        myTasks[headIndex] = currData;
        localStorage.setItem("myTasks", JSON.stringify(myTasks));
    }
    const currHead = document.getElementById(`entry-head-${headIndex}`);
    currHead.style.display = 'block';
    currForm.style.display = 'none';
    populateTasks();
    eventMode = -1;
}

function onNewClick() {
    if (eventMode === -1) {
        newTaskIndex = myTasks.length;
        myTasks.push({ title: "", details: "", due: "", status: "Not started" });
        document.getElementById('contr-tasks').appendChild(renderSingleTask(newTaskIndex));
        populateTasks();
        setEventListenersOnIndex(newTaskIndex);
        // format new Date() into 2025-11-19T13:33
        localStorage.setItem("myTasks", JSON.stringify(myTasks));
    }
}
