function renderSingleTask(taskIndex) {
    const divElem = document.createElement("div");
    divElem.innerHTML = `
        <div>
            <div class="entry-head" id="entry-head-${taskIndex}">
                <table>
                    <tr>
                        <td id="td-title-${taskIndex}"></td>
                        <td id="td-due-${taskIndex}"></td>
                        <td id="td-status-${taskIndex}"></td>
                    </tr>
                </table>
            </div>
            <div class="entry-form" style="display: none;" id="entry-form-${taskIndex}">
                <p>
                    <label>Title</label>
                    <input type="text" id="txt-title-${taskIndex}" placeholder="Enter Title">
                </p>
                <p>
                    <label>Details</label>
                    <textarea id="txt-dtls-${taskIndex}" rows="4" columns="15" placeholder="Enter Details"></textarea>
                </p>
                <p>
                    <label>Due Date</label>
                    <input type="datetime-local" id="dt-due-${taskIndex}">
                </p>
                <p>
                    <label>Status</label>
                    <select id="sel-status-${taskIndex}">
                        <option id="opt-ns-${taskIndex}">Not started</option>
                        <option id="opt-ip-${taskIndex}">In progress</option>
                        <option id="opt-cp-${taskIndex}">Complete</option>
                        <option id="opt-cn-${taskIndex}">Cancelled</option>
                    </select>
                </p>
                <p>
                    <button class="btn-dsm" id="btn-dsm-${taskIndex}">Dismiss</button>
                    <button class="btn-save" id="btn-save-${taskIndex}">Save changes</button>
                </p>
            </div>
        </div>`;
    return divElem;
}

function renderSingleTask_obs(taskIndex) {
    console.log(`*** DIAG *** renderSingleTask, taskIndex ${taskIndex}`);
    const tdTitle = document.createElement("td");
    tdTitle.id = `td-title-${taskIndex}`;
    const tdDue = document.createElement("td");
    tdDue.id = `td-due-${taskIndex}`;
    const tdStatus = document.createElement("td");
    tdStatus.id = `td-status-${taskIndex}`;
    const trElem = document.createElement("tr");
    trElem.appendChild(tdTitle);
    trElem.appendChild(tdDue);
    trElem.appendChild(tdStatus);
    const tableElem = document.createElement("table");
    tableElem.appendChild(trElem);
    const divEHElem = document.createElement("div");
    divEHElem.id = `entry-head-${taskIndex}`;
    divEHElem.classList.add('entry-head');
    divEHElem.appendChild(tableElem);

    const buttonDsmElem = document.createElement("button");
    buttonDsmElem.id = `btn-dsm-${taskIndex}`;
    buttonDsmElem.classList.add('btn-dsm');
    buttonDsmElem.innerText = 'Dismiss';

    const buttonSaveElem = document.createElement("button");
    buttonSaveElem.id = `btn-save-${taskIndex}`;
    buttonSaveElem.classList.add('btn-save');
    buttonSaveElem.innerText = 'Save changes';

    const pButtonsElem = document.createElement("p");
    pButtonsElem.appendChild(buttonDsmElem);
    pButtonsElem.appendChild(buttonSaveElem);

    const divEFElem = document.createElement("div");
    divEFElem.id = `entry-form-${taskIndex}`;
    divEFElem.classList.add('entry-form');
    divEFElem.style.display = "none";
    divEFElem.appendChild(pButtonsElem);

    const divElem = document.createElement("div");
    divElem.appendChild(divEHElem);
    divElem.appendChild(divEFElem);
    return divElem;
    return `
        <div>
            <div class="entry-head" id="entry-head-${taskIndex}">
                <table>
                    <tr>
                        <td id="td-title-${taskIndex}"></td>
                        <td id="td-due-${taskIndex}"></td>
                        <td id="td-status-${taskIndex}"></td>
                    </tr>
                </table>
            </div>
            <div class="entry-form" style="display: none;" id="entry-form-${taskIndex}">
                <p>
                    <label>Title</label>
                    <input type="text" id="txt-title-${taskIndex}" placeholder="Enter Title">
                </p>
                <p>
                    <label>Details</label>
                    <textarea id="txt-dtls-${taskIndex}" rows="4" columns="15" placeholder="Enter Details"></textarea>
                </p>
                <p>
                    <label>Due Date</label>
                    <input type="datetime-local" id="dt-due-${taskIndex}">
                </p>
                <p>
                    <label>Status</label>
                    <select id="sel-status-${taskIndex}">
                        <option id="opt-ns-${taskIndex}">Not started</option>
                        <option id="opt-ip-${taskIndex}">In progress</option>
                        <option id="opt-cp-${taskIndex}">Complete</option>
                        <option id="opt-cn-${taskIndex}">Cancelled</option>
                    </select>
                </p>
                <p>
                    <button class="btn-dsm" id="btn-dsm-${taskIndex}">Dismiss</button>
                    <button class="btn-save" id="btn-save-${taskIndex}">Save changes</button>
                </p>
            </div>
        </div>`;
}

function renderTasks() {
    const tasksContainer = document.getElementById('contr-tasks');
    // let tasksHTML = '';
    // myTasks.forEach((task, index) => { tasksHTML += renderSingleTask(index); });
    // tasksContainer.innerHTML = tasksHTML;
    myTasks.forEach((task, index) => { tasksContainer.appendChild(renderSingleTask(index)) });
}
