'use strict';

// create class card 

function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('card-template', {
        description: this.name
    }, 'li');
    this.element.querySelector('.card').addEventListener('click', function(event) {
        event.stopPropagation();
        if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
        }
    });
}

// prototypes for card

Card.prototype = {
    removeCard: function() {
        var self = this;
        fetch(baseUrl + '/card/' + self.id, {
            method: 'DELETE',
            headers: myHeaders
        }).then(function(resp) {
            return resp.json();
        }).then(function() {
            self.element.parentNode.removeChild(this.element);
        })
    }
}