import DataColl from './DataColl.js';

export default class DataCollModel {
    constructor() {
        this.eventStatesList = [];

        this.story = [
            "(1) Jack thought his new trench coat was very sleek.",
            "(2) He wore it no matter the season.",
            "(3) One day he noticed a small tear in the back.",
            "(4) Spiders were crawling out of the breach.",
            "(5) Jack doesn't wear his trench coat any more."
        ];
    }

    getStorySentence(index) {
        return this.story[index];
    }

    setView(initView) {
        this.view = initView;
    }
}