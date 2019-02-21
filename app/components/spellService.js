import Spell from "../models/spell.js";

function formatUrl(url) {
    return '//bcw-getter.herokuapp.com/?url=' + encodeURIComponent(url)
}
let _spellApi = axios.create({
    baseURL: ''
})

let _sandboxApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Brett/spells/'
})

let _state = {
    spellsApi: [],
    activeSpell: {},
    mySpellBook: [],
    myActiveSpell: {}
}

let _subscribers = {
    spellsApi: [],
    activeSpell: [],
    mySpellBook: [],
    myActiveSpell: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

export default class SpellService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get SpellsApi() {
        return _state.spellsApi.map(s => new Spell(s))
    }

    get ActiveSpell() {
        return _state.activeSpell
    }

    get MySpellBook() {
        return _state.mySpellBook.map(s => new Spell(s))
    }

    get MyActiveSpell() {
        return _state.myActiveSpell
    }

    getSpellData() {
        _spellApi.get(formatUrl('http://dnd5eapi.co/api/spells/'))
            .then(res => {
                setState('spellsApi', res.data.results)
            })
    }

    getDetails(url) {
        _spellApi.get(formatUrl(url))
            .then(res => {
                let data = new Spell(res.data)
                setState('activeSpell', data)
            })
    }

    showDetails(id) {
        let spell = _state.mySpellBook.find(s => s._id == id)
        setState('activeSpell', spell)
    }

    addSpellToMySpellBook(name) {
        let check = _state.mySpellBook.find(s => s.name == _state.activeSpell.name)
        if (!check) {
            let spell = _state.activeSpell
            _sandboxApi.post('', spell)
                .then(res => {
                    this.mySpellBookData()
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    mySpellBookData() {
        _sandboxApi.get()
            .then(res => {
                let data = res.data.data.map(s => new Spell(s))
                setState('mySpellBook', data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    showMySpellBookDetails(_id) {
        let data = _state.mySpellBook.find(s => s._id == _id)
        setState('myActiveSpell', data)
    }

    deleteFromMySpellBook(_id) {
        _sandboxApi.delete(_id)
            .then(res => {
                this.mySpellBookData()
                setState('myActiveSpell', '')
            })
    }

}
