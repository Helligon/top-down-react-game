import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants';
import './styles.css'

function getTileSprite(type) {
    switch (type) {
        case 0:
            return 'grass'
        case 1:
            return 'chest'
        case 2:
            return 'passable-tree'
        case 5:
            return 'rock'
        case 6:
            return 'tree'
        default:
            break;
    }
}

function MapTile(props) {
    return (
        <div
            className={`tile ${getTileSprite(props.tile)}`}
            style={{
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        />
    )
}

function MapRow(props) {
    return <div className="row">
        {
            props.tiles.map(tile => <MapTile tile={tile} />)
        }
    </div>
}

function Map(props) {
    return (
        <div
            style={{
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '800px',
                height: '400px',
                backgroundColor: 'yellowgreen',
                border: '4px solid darkgray',
                margin: '10px auto'
            }}
        >
            {
                props.tiles.map(row => <MapRow tiles={row} />)

            }
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        tiles: state.map.tiles
    }
}

export default connect(mapStatetoProps)(Map);