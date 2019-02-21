export default class Spell {
  constructor(data) {
    this._id = data._id || data.id
    this.name = data.name
    this.description = data.description || data.desc
    this.duration = data.duration
    this.level = data.level
    this.page = data.page
    this.url = data.url
    this.range = data.range
    this.duration = data.duration
    this.index = data.index
  }

  getTemplate() {
    return `
        <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">${this.name}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">Level: ${this.level} -- Duration: ${this.duration}</h6>
                              <p class="card-text">${this.description}</p>
                              <p class="card-text">Page: ${this.page}</p>
                              <button class="btn btn-primary" onclick="app.controllers.spellController.addSpellToMySpellBook('${this.name}')">Add to Spellbook</button>
                            </div>
                          </div>
        `
  }

  getMyTemplate() {
    return `
        <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">${this.name}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">Level: ${this.level} -- Duration: ${this.duration}</h6>
                              <p class="card-text">${this.description}</p>
                              <p class="card-text">Page: ${this.page}</p>
                              <button class="btn btn-danger" onclick="app.controllers.spellController.deleteFromMySpellBook('${this._id}')">Delete From Spellbook</button>
                            </div>
                          </div>
        `
  }

}