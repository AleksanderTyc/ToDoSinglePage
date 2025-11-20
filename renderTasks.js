function renderTasks() {
    const tasksContainer = document.getElementById('contr-tasks');
    let tasksHTML = '';
    myTasks.forEach((task, index) => {
        tasksHTML += `
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
    tasksContainer.innerHTML = tasksHTML;
}
