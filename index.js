let myTasks;
let eventMode = -1;

function getData() {
    myTasks = JSON.parse(localStorage.getItem("myTasks")) || [{ title: "ab", details: "cd", due: "2025-11-19T13:33", status: "Complete" }];
    // console.log(`${typeof myTasks}, ${myTasks}`, myTasks);
}

function renderTasks() {
    const tasksContainer = document.getElementById('contr-tasks');
    tasksContainer.innerHTML = '';
    myTasks.forEach((task, index) => {
        tasksContainer.innerHTML += `
        <div class="entry-head" id="entry-head-${index}">
            <table>
                <tr>
                    <td>${task.title}</td>
                    <td>${task.due}</td>
                    <td>${task.status}</td>
                </tr>
            </table>
        </div>
        <div class="entry-form" style="display: none;" id="entry-form-${index}">
            <p>
                <label>Title</label>
                <input type="text" id="txt-title-${index}" value="${task.title}" placeholder="Enter Title">
            </p>
            <p>
                <label>Details</label>
                <textarea id="txt-dtls-${index}" rows="4" columns="15" placeholder="Enter Details">${task.details}</textarea>
            </p>
            <p>
                <label>Due Date</label>
                <input type="datetime-local" id="dt-due-${index}" value="${task.due}">
            </p>
            <p>
                <label>Status</label>
                <select id="sel-status-${index}">
                    <option ${task.status === 'Not started' ? 'selected' : ''}>Not started</option>
                    <option ${task.status === 'In progress' ? 'selected' : ''}>In progress</option>
                    <option ${task.status === 'Complete' ? 'selected' : ''}>Complete</option>
                    <option ${task.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </p>
            <p>
                <button class="btn-dsm" id="btn-dsm-${index}">Dismiss</button>
                <button class="btn-save" id="btn-save-${index}">Save changes</button>
            </p>
        </div>`;
    });

    // template
    /*
        <div class="entry-head" id="entry-head-0">
            <table>
                <tr>
                    <td>Title</td>
                    <td>DueDate</td>
                    <td>Status</td>
                </tr>
            </table>
        </div>
        <div class="entry-form" id="entry-form-0">
            <p><label>Title</label> <input type="text" id="txt-title-0" placeholder="Enter Title"></p>
            <p><label>Details</label> <textarea id="txt-dtls-0" rows="4" columns="15"
                    placeholder="Enter Details"></textarea></p>
            <p><label>Due Date</label><input type="datetime-local" id="dt-due-0"></p>
            <p>
                <label>Status</label>
                <select id="sel-status-0">
                    <option>Not started</option>
                    <option>In progress</option>
                    <option>Complete</option>
                    <option>Cancelled</option>
                </select>
            </p>
            <p>
                <button class="btn-dsm" id="btn-dsm-0">Dismiss</button>
                <button class="btn-save" id="btn-save-0">Save changes</button>
            </p>
        </div>
    */
}

function eventHandlerStd(argFunction, ...args) {
    // console.log(`*** DIAG *** Setting up event handler ${argFunction} with args ${args}`, typeof args);
    return () => argFunction(...args);
    /*
    onClickOnHead(index)); -> eventHandlerStd( onClickOnHead, index )
    onOKCancelClick(index, false)); -> eventHandlerStd( onOKCancelClick, index, false )
    onOKCancelClick(index, true)); -> eventHandlerStd( onOKCancelClick, index, true )
    */
}

function setEventListeners() {
    const addNew = document.getElementById('btn-new');
    addNew.addEventListener('click', onNewClick);
    for (let index = 0; index < myTasks.length; index++) {
        const currTaskHead = document.getElementById(`entry-head-${index}`);
        currTaskHead.addEventListener('click', () => onClickOnHead(index));
        const currTaskBtnDsm = document.getElementById(`btn-dsm-${index}`);
        currTaskBtnDsm.addEventListener('click', () => onOKCancelClick(index, false));
        const currTaskBtnSave = document.getElementById(`btn-save-${index}`);
        currTaskBtnSave.addEventListener('click', () => onOKCancelClick(index, true));
    }
}

function executeOnLoad() {
    getData();
    renderTasks();
    setEventListeners();
    eventMode = -1;
    return;

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
        allDismiss[index].addEventListener('click', () => onOKCancelClick(index, false));
    }
    const allSave = document.getElementsByClassName("btn-save");
    for (let index = 0; index < allSave.length; index++) {
        allSave[index].addEventListener('click', () => onOKCancelClick(index, true));
    }
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
        console.log("*** INFO *** + clicked, adding New Task");
    }
}

