const DIRECTIONS = [{
        x: 1,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: -1,
        y: 0
    },
    {
        x: 0,
        y: -1
    },
]

const EXPLOSION_DURATION = (2 * 1000);

class Tile {
    x;
    y;

    size;
    wall = null;
    bomb = null;
    explosion = false;
    board;

    explosionTimer = null;

    constructor(x, y, size, board) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.board = board;
    }

    isWalkable = () => this.wall === null && this.bomb === null;

    canPlaceBomb = () => this.bomb === null && this.wall === null && !this.explosion;

    getWall = () => this.wall;

    getBomb = () => this.bomb;

    hasExplosion = () => this.explosion;

    placeBomb = () => {
        if (this.bomb !== null)
            console.log(`Placing bomb on tile x:${this.x} y:${this.y}`);
        this.bomb = new Bomb((bomb) => {
            DIRECTIONS.forEach(dir => {
                const tiles = this.board.getTilesInDirection(this.x, this.y, dir, bomb.range);
                for (let i = 0; i < tiles.length; i++) {
                    if (tiles[i].isWalkable()) {
                        tiles[i].setExplosion(tiles[0].x, tiles[0].y);
                    } else if (tiles[i].getBomb()) {
                        tiles[i].setExplosion(tiles[0].x, tiles[0].y);
                    } else if (tiles[i].getWall() && tiles[i].getWall().breakable) {
                        tiles[i].setExplosion(tiles[0].x, tiles[0].y);
                        break;
                    } else {
                        break;
                    }
                }
            });
        });
    }

    setExplosion = (originX, originY) => {
        var b = this.bomb;
        this.bomb = null;
        this.breakWall();
        if (b !== null && (originX !== this.x || originY !== this.y)) {
            console.log(`Exploding bomb from explosion at x:${this.x} y:${this.y}`);
            b.explode();
        }

        if (this.explosionTimer) {
            clearTimeout(this.explosionTimer);
        }
        this.explosion = true;
        this.explosionTimer = setTimeout(() => {
            this.explosion = false;
        }, EXPLOSION_DURATION);
    }

    removeExplosion = () => {
        this.explosion = null;
    }

    removeBomb = () => {
        if (this.bomb) {
            this.bomb.clear();
        }
        this.bomb = null;
    }

    placeWall = (wall) => {
        this.wall = wall;
    }

    breakWall = () => {
        if (this.wall && this.wall.breakable) {
            this.wall = null;
        }
    }

    getDrawX = () => this.x * this.size;
    getDrawY = () => this.y * this.size;

}