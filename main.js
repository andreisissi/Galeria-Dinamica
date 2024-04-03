const btnAddFoto = document.querySelector('.btn-add-foto');
const galeria = document.querySelector('.container-galeria');

document.addEventListener('DOMContentLoaded', () => {
   galeria.innerHTML = localStorage.getItem('imagem') || '';
})

function adicionaFoto() {
   const inputFoto = document.querySelector('#input-foto');

   const containerFoto = document.createElement('div');
   containerFoto.classList.add('new-foto');

   const img = document.createElement('img');
   if (inputFoto.files && inputFoto.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
         img.src = event.target.result;
         containerFoto.appendChild(img);
         containerFoto.appendChild(deleteBtn);
         galeria.appendChild(containerFoto);
         salvarImagem();
      };
      reader.readAsDataURL(inputFoto.files[0]);
      inputFoto.value = '';
   } else {
     alert('Por favor, selecione uma imagem.');
     return;
   }

   const deleteBtn = document.createElement('button');
   deleteBtn.classList.add('delete-btn');
   deleteBtn.innerText += 'Deletar';
}

function salvarImagem() {
   const imgSalva = galeria.innerHTML;
   localStorage.setItem('imagem', imgSalva);
}

function btnDelete() {

   var containerFoto = document.querySelector('.new-foto');
   if(containerFoto.parentNode) {
      containerFoto.parentNode.removeChild(containerFoto);
   }
   // var containerFoto = document.querySelector('.new-foto');
   // galeria.removeChild(containerFoto);

}

document.addEventListener('click', (e) => {
   var alvo = e.target;

   if (alvo.classList.contains('delete-btn')) {
      confirm('Tem certeza que deseja excluir essa imagem?')
      btnDelete();
   }
})

btnAddFoto.addEventListener('click', (e) => {
   e.preventDefault();
   adicionaFoto();
})

