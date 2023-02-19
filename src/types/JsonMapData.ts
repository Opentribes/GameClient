export interface JsonCenterLocation{
    x:number
    y:number
}

export interface JsonViewport{
    width:number
    height:number
    center: JsonCenterLocation
}
export interface JsonMapTileLocation {
    x: number;
    y: number;
}

export interface JsonMapTile {
    id: string;
    data: number;
    location: JsonMapTileLocation
}
export interface JsonMapLayer{
    [key: string]: JsonMapTile[]
}
export interface JsonMapData {
    layers: JsonMapLayer
    viewport: JsonViewport
}