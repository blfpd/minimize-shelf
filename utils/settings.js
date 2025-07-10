export class Direction {
    constructor(settings) {
        this.Left = 0;
        this.Right = 1;
        this.settings = settings;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if ([0, 1].includes(value)) this._value = value;
        else throw Error('Invalid direction');
    }
    get name() {
        return { 0: 'left', 1: 'right' }[this.value];
    }
    get box() {
        return { 0: '_leftBox', 1: '_rightBox' }[this.value];
    }
    // Last position of left side, but first on right side
    get index() {
        return { 0: -1, 1: 1 }[this.value];
    }
    anchor(width) {
        return { 0: 200, 1: width - 150 }[this.value];
    }
    label(value) {
        return { 0: 'Left', 1: 'Right' }[value];
    }
    load() {
        this.value = this.settings.get_enum('direction');
        return this;
    }
    save(value) {
        this.settings.set_enum('direction', value);
        this.value = value;
    }
}
