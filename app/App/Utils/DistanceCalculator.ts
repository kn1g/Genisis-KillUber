export default class DistanceCalculator {
  static R = 6371; // km (change this constant to get miles)

  /**
   * Code from https://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates/
   * @param lat1 From Latitude
   * @param lon1 From Longitude
   * @param lat2 To Latitude
   * @param lon2 To Longitude
   * @return Distance in km
   */
  static distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(this.R * c * 100) / 100;
  }
}
