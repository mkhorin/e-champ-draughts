/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsMoveList = class DraughtsMoveList {

    constructor (play) {
        this.play = play;
        this.$container = play.find('.moves');
        this.$list = this.$container.find('.moves-list');
        this.$copy = this.$container.find('[data-action="copyPosition"]');
        this.$copy.click(this.onCopyPosition.bind(this));
        this.previous = null;
    }

    clear () {
        this.$list.empty();
        this.previous = null;
    }

    add (way) {
        this.previous ? this.updatePrevious(way) : this.addNew(way);
    }

    addNew (way) {
        const num = this.$list.children().length + 1;
        const text = way.stringify();
        this.$list.prepend(this.renderItem({num, text}));
        this.previous = way;
    }

    updatePrevious (way) {
        const num = this.$list.children().length;
        const text = `${this.previous.stringify()} ${way.stringify()}`;
        const content = this.renderItem({num, text});
        this.$list.children().first().replaceWith(content);
        this.previous = null;
    }

    renderItem (data) {
        return this.play.resolveTemplate('movesItem', data);
    }

    onCopyPosition () {
        Jam.Helper.copyToClipboard(this.play.pieces.stringify());
    }
};