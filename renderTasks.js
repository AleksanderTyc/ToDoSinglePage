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

function renderTasks() {
    const tasksContainer = document.getElementById('contr-tasks');
    myTasks.forEach((task, index) => { tasksContainer.appendChild(renderSingleTask(index)) });
}
