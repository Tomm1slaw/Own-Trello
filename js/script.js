'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // function to generate id

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // function to generate template from HTML

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');

        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);

        return element;
    }

    // function to add class columns

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', {
            name: this.name,
            id: this.id
        });

        this.element.querySelector('.column').addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-delete')) {
                self.removeColumn();
            }

            if (event.target.classList.contains('add-card')) {
                self.addCard(new Card(prompt("Enter the name of the card")));
            }
        });
    }

    // prototypes for columns

    Column.prototype = {
        addCard: function(card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
            this.element.parentNode.removeChild(this.element);
        }
    };

    // create class card 

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', {
            description: this.description
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
            this.element.parentNode.removeChild(this.element);
        }
    }

    // board declaration

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.element.appendChild(column.element);
            initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    };

    // drag'n'drop function

    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
            group: 'kanban',
            sort: true
        });
    }

    // function to add new column

    var buttonColumn = document.querySelector('#board .create-column');
    buttonColumn.addEventListener('click', function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New Task');
    var card2 = new Card('Doing');
    var card3 = new Card('Done');
    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});