const DIRECTION_DOWN = "down";
const DIRECTION_UP = "up";
const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";

const START_AREA = [{
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
    {
        x: 0,
        y: 0
    }
]

class Player {
    x;
    y;

    speed;
    tileSize;
    size;
    board;

    constructor(startX, startY, speed, tileSize, board) {
        this.x = startX;
        this.y = startY;
        this.drawX = startX * tileSize + (tileSize / 2) - (tileSize - 10) / 2;
        this.drawY = startY * tileSize + (tileSize / 2) - (tileSize - 10) / 2;
        this.speed = speed / 10;
        this.tileSize = tileSize;
        this.size = tileSize;
        this.board = board;
        this.createStartArea(startX, startY);
    }

    createStartArea = (x, y) => {
        START_AREA.forEach((cords) => {
            const t = this.board.getTileAt(x + cords.x, y + cords.y);
            if (t) {
                t.breakWall();
            }
        })
    }

    getDrawX = () => this.x * this.tileSize + (this.tileSize / 2) - this.size / 2;
    getDrawY = () => this.y * this.tileSize + (this.tileSize / 2) - this.size / 2;

    getX = () => Math.round(this.x);
    getY = () => Math.round(this.y);

    canMoveToTile = (x, y) => {
        const tile = this.board.getTileAt(x, y);
        return tile !== null && tile.isWalkable();
    }

    canMove = (direction) => {
        switch (direction) {
            case DIRECTION_LEFT:
                return this.canMoveToTile(Math.floor(this.x - this.speed), this.getY());
            case DIRECTION_RIGHT:
                return this.canMoveToTile(Math.ceil(this.x + this.speed), this.getY());
            case DIRECTION_UP:
                return this.canMoveToTile(this.getX(), Math.floor(this.y - this.speed));
            case DIRECTION_DOWN:
                return this.canMoveToTile(this.getX(), Math.ceil(this.y + this.speed));
            default:
                return false;
        }
    }

    move = () => {
        if (keyIsDown(LEFT_ARROW)) {
            this.x = this.canMove(DIRECTION_LEFT) ? this.x - this.speed : this.getX();
            this.y = this.getY();
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.x = this.canMove(DIRECTION_RIGHT) ? this.x + this.speed : this.getX();
            this.y = this.getY();
        } else if (keyIsDown(UP_ARROW)) {
            this.y = this.canMove(DIRECTION_UP) ? this.y - this.speed : this.getY();
            this.x = this.getX();
        } else if (keyIsDown(DOWN_ARROW)) {
            this.y = this.canMove(DIRECTION_DOWN) ? this.y + this.speed : this.getY();
            this.x = this.getX();
        }

        if (keyIsDown(32)) {
            const t = this.board.getTileAt(this.getX(), this.getY());
            if (t && t.canPlaceBomb()) {
                t.placeBomb();
            }
        }
    }
}