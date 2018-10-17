// client/app/ui/views/MensagemView.js
class MensagemView extends View{
    template(model){
        return model.texto
                ? `<p class="alert alert-info">${model.texto}</p>`
                : `<p></p>`;
    }
}