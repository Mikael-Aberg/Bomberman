class Board {
    tiles;

    w;
    h;
    tileSize;

    constructor(w, h, tileSize) {
        this.w = w;
        this.h = h;
        this.tileSize = tileSize;
        this.createBoard();
    }

    createBoard = () => {
        this.tiles = [];
        for (let x = 0; x < this.w; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.h; y++) {
                this.tiles[x][y] = new Tile(x, y, this.tileSize, this);
                this.tiles[x][y].placeWall(new Wall((x % 2 !== 1 || y % 2 !== 1)));
            }
        }

        console.log(`Board with ${this.w * this.h} tiles created`);

    }

    getTilesInDirection = (startX, startY, direction, distance) => {
        const list = [];

        console.log(`Getting ${distance} tile(s) in direction x:${direction.x} y:${direction.y} starting at x:${startX} y:${startY}`);

        for (let i = 0; i <= distance; i++) {
            const t = this.getTileAt(startX + (direction.x * i), startY + (direction.y * i));
            if (t) list.push(t);
        }

        return list;
    }

    getTileAt = (x, y) => {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return null;
        return this.tiles[x][y];
    }

    forEach = (cb) => {
        if (!cb) return;

        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                cb(this.tiles[x][y]);
            }
        }
    }

}