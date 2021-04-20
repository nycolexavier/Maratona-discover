<script>
        const Modal = {
            open() {
                //Abrir modal
                //Adicionar a class active ao modal
                document
                    .querySelector('.modal-overlay') //documento pesquise dentro de você pelo seletor que eu vou colocar ali dentro
                    .classList
                    .add('active')
            },
            close(){
                //fechar o modal
                //remover a class active do modal
                document
                    .querySelector('.modal-overlay')
                    .classList
                    .remove('active')

            }
        }
    </script>