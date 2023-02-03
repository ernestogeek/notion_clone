import Template from '../template'
import Lang from '../../utils/lang'

class Item{
    constructor(data, params){
        this.data    = data
        this.params  = params
    }

    create(){
        this.html = Template.js(this.template,{})

        this.html.addEventListener('visible',this.visible.bind(this))
    }

    update(){
        this.html.querySelector('.extensions__item-name').innerText    = this.data.name || Lang.translate('extensions_no_name')
        this.html.querySelector('.extensions__item-author').innerText  = this.data.author || (this.params.type == 'plugins' ? '@cub' : '@lampa')
        this.html.querySelector('.extensions__item-descr').innerText   = (this.data.descr || this.data.url || this.data.link).replace(/\n|\t|\r/g,' ')

        let status = this.html.querySelector('.extensions__item-disabled')

        status.innerText = Lang.translate('player_disabled')

        if(this.data.status || !this.params.autocheck) status.classList.add('hide')
        else status.classList.remove('hide')
    }

    cub(){
        let cub = document.createElement('div')
            cub.classList.add('extensions__cub')
            cub.innerText = 'CUB'
            
        this.html.appendChild(cub)
    }

    premium(){
        let author = this.html.querySelector('.extensions__item-author')

        let premium = document.createElement('span')
            premium.classList.add('extensions__item-premium')
            premium.innerText = 'CUB Premium'

        let where = author || this.html

        where.appendChild(premium)
    }

    visible(){
        this.update()
    }

    render(){
        return this.html
    }

    destroy(){
        this.html.remove()
    }
}

export default Item