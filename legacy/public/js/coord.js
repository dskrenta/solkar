export default class Coord {
  constructor (lat, lon, name) {
    this.lat = lat;
    this.lon = lon;
    this.name = name;
  }

  toString () {
    console.log(`Lat: ${this.lat}, Lon: ${this.lon}, Name: ${this.name}`);
  }
}
