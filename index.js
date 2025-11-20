let myTasks;
let eventMode = -1;

function getData() {
    // myTasks = JSON.parse(localStorage.getItem("myTasks")) || [{ title: "ab", details: "cd", due: "2025-11-19T13:33", status: "Complete" }];
    myTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
}

function populateTasks() {
    myTasks.forEach((task, index) => {
        document.getElementById(`td-title-${index}`).innerHTML = task.title;
        document.getElementById(`td-due-${index}`).innerHTML = task.due;
        document.getElementById(`td-status-${index}`).innerHTML = task.status;
        // document.getElementById(`txt-title-${index}`).value = task.title;
        // document.getElementById(`txt-dtls-${index}`).value = task.details;
        // document.getElementById(`dt-due-${index}`).value = task.due;
        // const optionsMap = {
        //     ns: 'Not started', ip: 'In progress', cp: 'Complete', cn: 'Cancelled'
        // };
        // ['ns', 'ip', 'cp', 'cn'].forEach(taskStatus => {
        //     console.log(`*** DIAG *** Setting status opt-${taskStatus}-${index}`, document.getElementById(`opt-${taskStatus}-${index}`) );
        //     document.getElementById(`opt-${taskStatus}-${index}`).selected = (task.status === optionsMap[taskStatus]);
        // });
    });
    /*
    const tasksHTML = `
    <div class="entry-head" id="entry-head-${index}">
        <table>
            <tr>
                <td id="td-title-${index}>${task.title}</td>
                    <td id="td-due-${index}">${task.due}</td>
                    <td id="td-status-${index}">${task.status}</td>
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
                    <option id="opt-ns-${index}" ${task.status === 'Not started' ? 'selected' : ''}>Not started</option>
                    <option id="opt-ip-${index}" ${task.status === 'In progress' ? 'selected' : ''}>In progress</option>
                    <option id="opt-cp-${index}" ${task.status === 'Complete' ? 'selected' : ''}>Complete</option>
                    <option id="opt-cn-${index}" ${task.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
        </p>
        <p>
            <button class="btn-dsm" id="btn-dsm-${index}">Dismiss</button>
            <button class="btn-save" id="btn-save-${index}">Save changes</button>
        </p>
    </div>`;
*/
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
    populateTasks();
    eventMode = -1;
}

function onNewClick() {
    if (eventMode === -1) {
        newTaskIndex = myTasks.length;
        console.log(`*** INFO *** + clicked, adding New Task index ${newTaskIndex}`);
        myTasks.push({ title: "", details: "", due: "", status: "Not started" });
        // const tasksContainer = document.getElementById('contr-tasks');
        // tasksContainer.innerHTML += renderSingleTask(newTaskIndex);
        document.getElementById('contr-tasks').appendChild( renderSingleTask(newTaskIndex) );
        populateTasks();
        setEventListenersOnIndex(newTaskIndex);
        // format new Date() into 2025-11-19T13:33
        localStorage.setItem("myTasks", JSON.stringify(myTasks));
    }
}
