import SpellService from "./spellService.js";

let _ss = new SpellService()

function drawSpellApi() {
    let template = ''
    _ss.SpellsApi.forEach(s => {
        template += `
        <li onclick="app.controllers.spellController.getDetails('${s.url}')">${s.name}</li>
        `
    })
    document.querySelector('#api-spells').innerHTML = template
}

function drawActiveSpell() {
    document.querySelector('#active-spell').innerHTML = _ss.ActiveSpell.getTemplate()
}

function drawSpellbook() {
    let template = ''
    _ss.MySpellBook.forEach(s => {
        template += `
        <li onclick="app.controllers.spellController.showMySpellBookDetails('${s._id}')">${s.name}</li>
        `
    })
    document.querySelector('#my-spellbook').innerHTML = template
}

function drawMyActiveSpell() {
    if (_ss.MyActiveSpell._id) {
        document.querySelector('#active-spell').innerHTML = _ss.MyActiveSpell.getMyTemplate()
    }
    else {
        document.querySelector('#active-spell').innerHTML = ''
    }


}

export default class SpellController {
    constructor() {
        _ss.addSubscriber('spellsApi', drawSpellApi)
        _ss.addSubscriber('activeSpell', drawActiveSpell)
        _ss.addSubscriber('mySpellBook', drawSpellbook)
        _ss.addSubscriber('myActiveSpell', drawMyActiveSpell)
        _ss.getSpellData()
        _ss.mySpellBookData()
    }

    //get spells from d&d api
    getDetails(url) {
        _ss.getDetails(url)
    }

    //shows spell card when click d&d api spell from list (left)
    showDetails(id) {
        _ss.showDetails(id)
    }

    //button to add to my spell book
    addSpellToMySpellBook(name) {
        _ss.addSpellToMySpellBook(name)
    }

    //show spell card when click on my spell book list (right)
    showMySpellBookDetails(_id) {
        _ss.showMySpellBookDetails(_id)
    }

    deleteFromMySpellBook(_id) {
        _ss.deleteFromMySpellBook(_id)
    }

}