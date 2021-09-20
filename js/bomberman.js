const w = 21;
const h = 21;

const tileSize = 40;

const board = new Board(w, h, tileSize);
const player = new Player(0, 0, 1, tileSize, board);

function setup() {
    createCanvas(w * tileSize, h * tileSize);
}

function draw() {
    board.forEach((tile) => {
        if (tile.isWalkable() && !tile.hasExplosion()) {
            fill("#FFFFFF");
        } else if (tile.getWall()) {
            if (tile.getWall().breakable) {
                fill("#9e9e9e");
            } else {
                fill("#000000");
            }
        } else if (tile.getBomb()) {
            fill('#ff2121');
        } else if (tile.hasExplosion()) {
            fill("#f5e505");
        }

        rect(tile.getDrawX(), tile.getDrawY(), tile.size, tile.size);
    });

    player.move();
    fill("#a1caff");
    rect(player.getDrawX(), player.getDrawY(), player.size, player.size);
}