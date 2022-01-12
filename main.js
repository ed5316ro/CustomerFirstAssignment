
async function loadAPI(){
    try{
        // Fetch API async/await, sends data to html template
        const resp = await fetch('https://reqres.in/api/users/');
        const users = await resp.json();
        cardHtmlTemplate(users);
    } catch {
    }
}

function cardHtmlTemplate(data){
    const cardContainer = document.querySelector('.card-container');
    const users = data.data;
    users.map(x => { 
        console.log(x);
        html = `
        <div class='card' data-id='`+ x.id +`'>
        <img src="`+ x.avatar +`" alt="" srcset="">
        <h3>`+ x.first_name +' '+ x.last_name+` </h3>
        <p>`+ x.email +`</p>
        </div>`
        cardContainer.innerHTML += html;
    })
    const link = document.querySelectorAll('.card');
    link.forEach(e => {
        e.addEventListener('click',(e)=>{
            const cardId = e.target.dataset.id;
            modalHtmlTemplate(cardId);
            const modalContainer = document.querySelector('.modal-container');
            modalContainer.classList.remove('hidden');
        });
    });
 }

 async function modalHtmlTemplate(id){
    console.log(id);
    const resp = await fetch('https://reqres.in/api/users/'+id);
    const user = await resp.json();
    console.log(user);
    const modal = document.querySelector('.modal');
    html = `
    <button class='modal-btn'>X</button>
    <img src="`+ user.data.avatar +`" alt="" srcset="">
        <h3>`+ user.data.first_name +' '+ user.data.last_name+` </h3>
        <p>`+ user.data.email +`</p>`
    modal.innerHTML =html;
    const buttonModal = document.querySelector('.modal-btn');
    buttonModal.addEventListener('click',()=>{
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.add('hidden');
    })
 }

loadAPI();
