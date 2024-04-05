const btnAddFoto = document.querySelector('.btn-add-foto');
const galeria = document.querySelector('.container-galeria');

document.addEventListener('DOMContentLoaded', () => {
   galeria.innerHTML = localStorage.getItem('imagem') || '';
});

async function adicionaFoto() {
   const inputFoto = document.querySelector('#input-foto');
   const idUnico = geraId();

   const containerFoto = document.createElement('div');
   containerFoto.classList.add('new-foto');
   containerFoto.setAttribute('data-id', idUnico);

   const img = document.createElement('img');

   if (inputFoto.files && inputFoto.files[0]) {
      const reader = new FileReader();
      reader.onload = async function(event) {
         const compressedDataUrl = await compressImage(event.target.result, 0.7);
         img.src = compressedDataUrl;         
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
   deleteBtn.innerText = 'Deletar';
}

function salvarImagem() {
   const imgSalva = galeria.innerHTML;
   localStorage.setItem('imagem', imgSalva);
}

function btnDelete(id) {
   const novaId = document.querySelector(`[data-id="${id}"]`);
   if(novaId){
      novaId.remove();
      salvarImagem();
   }
}

function geraId() {
   return Math.random().toString(36).substring(2, 9);
}

function compressImage(dataUrl, quality) {
   return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d');
         const maxWidth = 600;

         let width = img.width;
         let height = img.height;

         if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
         }

         canvas.width = width;
         canvas.height = height;

         ctx.drawImage(img, 0, 0, width, height);

         canvas.toBlob(function(blob) {
            const compressedReader = new FileReader();
            compressedReader.onload = function() {
               resolve(compressedReader.result);
            };
            compressedReader.readAsDataURL(blob);
         }, 'image/jpeg', quality);
      };
      img.src = dataUrl;
   });
}

btnAddFoto.addEventListener('click', (e) => {
   e.preventDefault();
   adicionaFoto();
});

document.addEventListener('click', (e) => {
   var alvo = e.target;

   if (alvo.classList.contains('delete-btn')) {
      if (confirm('Tem certeza que deseja excluir essa imagem?')) {
         const id = alvo.parentElement.dataset.id;
         btnDelete(id);
      }
   }
});
