let TodoList = []

function addTask(){
    let id = Date.now()
    let objectTodo = {
    id:id,
    label:$('#input-box').val()
    }
    if ($('#input-box').val() !=="") {   
    TodoList.push(objectTodo)
    $('#list-container').append(`
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${$('#input-box').val()} #${id}</span>
        <div>
            <button class="edit-me btn btn-secondary btn-sm mr-1" data-id="${id}" onclick="DataEdit(event)">Edit</button>
            <button class="delete-me btn btn-danger btn-sm" data-id="${id}" onclick="deleteFunc(event)">Delete</button>
        </div>
    </li> `)
    }
    localStorage['info']=JSON.stringify(TodoList)
    $('#input-box').val('')
    console.log(TodoList);
}
if (localStorage['info']) {
    let local = JSON.parse(localStorage['info'])
    TodoList = local
    local.forEach((val)=>{
        $('#list-container').append( `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${val.label} #${val.id}</span>
        <div>
            <button class="edit-me btn btn-secondary btn-sm mr-1" data-id='${val.id}' onclick = 'DataEdit(event)'>Edit</button>
            <button class="delete-me btn btn-danger btn-sm" data-id="${val.id}" onclick="deleteFunc(event)">Delete</button>
        </div>
        </li>`)
    })
}

function DataEdit(e){
    let id = e.target.dataset.id
    let myInfo = TodoList.find(value=>value.id === +id)
    if (!myInfo) {
        alert('sxal')
        return
    }
    $('#input-box').val(myInfo.label)
    $('.myActionAddBtn').addClass('d-none')
    $('.myActionUpdateBtn').removeClass('d-none')
    $('.myActionUpdateBtn').attr('data-id',id)
}

function deleteFunc(e){
    TodoList = TodoList.filter(val => val.id !== +e.target.dataset.id)
    e.target.parentElement.parentElement.remove()
    localStorage['info']=JSON.stringify(TodoList)
}

function updateTask(){
    TodoList = TodoList.map((res)=>{
        if (res.id === $('.myActionUpdateBtn').data('id')) {
            res.label = $('#input-box').val()
        }
        return res
    })
    $('.myActionAddBtn').removeClass('d-none')
    $('.myActionUpdateBtn').addClass('d-none')
    $('#input-box').val('')
    viewPrint()
}
function viewPrint(){
    $('#list-container').html('')
    TodoList.forEach((val)=>{
        $('#list-container').append( `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${val.label} #${val.id}</span>
    <div>
        <button class="edit-me btn btn-secondary btn-sm mr-1" data-id='${val.id}' onclick = 'DataEdit(event)'>Edit</button>
        <button class="delete-me btn btn-danger btn-sm" data-id="${val.id}" onclick="deleteFunc(event)">Delete</button>
    </div>
    </li>`)
    })
    localStorage['info']=JSON.stringify(TodoList)
}

let y = localStorage['color']
if (y) {
   document.body.style.background = y 
}
if (y==='white') {
    $('.powerOn').show()
    $('.powerOff').hide()
    $('.text-center').css('color', 'black')
}
if (y==='black') {
    $('.powerOn').hide()
    $('.powerOff').show()
    $('.text-center').css('color', 'white')
}
function WhiteColor(){
    document.body.style.background = 'black'
    $('.text-center').css('color', 'white')
    localStorage['color'] = 'black'
    $('.powerOn').hide()
    $('.powerOff').show()
}
function BlackColor(){
    document.body.style.background = 'white'
    $('.text-center').css('color', 'black')
    localStorage['color'] = 'white'
    $('.powerOff').hide()
    $('.powerOn').show()
}