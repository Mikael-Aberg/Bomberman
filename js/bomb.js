const BOMB_DELAY = (3 * 1000);

class Bomb {
    bombTimer;
    onExplode;
    range = 3;

    constructor(onExplode) {
        this.onExplode = onExplode;
        this.bombTimer = setTimeout(this.explode, BOMB_DELAY);
    }

    explode = () => {
        this.onExplode(this);
        this.clear();
    }

    clear = () => {
        if (this.bombTimer)
            clearTimeout(this.bombTimer);
        this.bombTimer = null;
    }
}