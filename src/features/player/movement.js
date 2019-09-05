import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'
import { setTileBlank } from '../../data/maps/1'

export default function handleMovement(player) {

    function getNewPosition(direction) {
        const oldPos = store.getState().player.position
        switch (direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            case 'SOUTH':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]
            default:
                break;
        }
    }

    function getSpriteLocation(direction, walkIndex) {
        switch (direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
            case 'EAST':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
            case 'WEST':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
            case 'NORTH':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
            default:
                break;
        }
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 7 ? 0 : walkIndex + 1
    }

    function observeBoundaries(newPos) {
        return (
            (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
        )
    }

    function observeImpassable(newPos) {
        const tiles = store.getState().map.tiles
        const x = newPos[0] / SPRITE_SIZE
        const y = newPos[1] / SPRITE_SIZE
        const nextTile = tiles[y][x]

        console.log(nextTile)

        if (nextTile === 1) {
            setTileBlank(x, y)
        }

        return (nextTile < 5)
    }

    function dispatchMove(newPos, direction) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex),
            }
        })
    }

    function attemptMove(direction) {
        const newPos = getNewPosition(direction)

        if (observeBoundaries(newPos) && observeImpassable(newPos)) {
            dispatchMove(newPos, direction)
        }
    }

    function handleKeyDown(e) {
        e.preventDefault()

        switch (e.keyCode) {
            case 37:
                return attemptMove('WEST')
            case 38:
                return attemptMove('NORTH')
            case 39:
                return attemptMove('EAST')
            case 40:
                return attemptMove('SOUTH')
            default:
                break;
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}