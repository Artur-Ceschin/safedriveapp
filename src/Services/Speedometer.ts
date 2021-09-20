import MathUtils from "./MathUtils";
import Vector3 from "./Vector3";

export default class Speedometer {
    static measurementsCount: number = 10;
    static updateIntervalMilliseconds: number = 100;
    static measuredData: number[][] = [];

    static setUpdateInterval(newValue: number) {
        this.measurementsCount = newValue;
    }

    static getVelocityFromAccelerometerData(
        accelerometerData: { x: number, y: number, z: number }
    ) {
        // Object data from accelerometer (in G)
        const { x, y, z } = accelerometerData;

        // Extract each axis value and convert to m/s^2
        const acc = [x, y, z].map(component => component * Constants.G);

        // Append to array of values
        this.measuredData.push(acc);
        if (this.measuredData.length >= 10) {
          this.measuredData = this.measuredData.slice(1);
        }
        const axArray = (this.measuredData.map(e => e[0]));
        const ayArray = (this.measuredData.map(e => e[1]));
        const azArray = (this.measuredData.map(e => e[2]));

        const axMean = MathUtils.arrayMean(axArray);
        const ayMean = MathUtils.arrayMean(ayArray);
        const azMean = MathUtils.arrayMean(azArray);

        const acceleration = ({
          x: axMean,
          y: ayMean,
          z: azMean,
        });

        // Velocidades
        const vxArray = MathUtils.integrate(axArray, this.updateIntervalMilliseconds / 1000);
        const vyArray = MathUtils.integrate(ayArray, this.updateIntervalMilliseconds / 1000);
        const vzArray = MathUtils.integrate(azArray, this.updateIntervalMilliseconds / 1000);

        const vxMean = MathUtils.arrayMean(vxArray);
        const vyMean = MathUtils.arrayMean(vyArray);
        const vzMean = MathUtils.arrayMean(vzArray);

        const vx = vxMean;
        const vy = vyMean;
        const vz = vzMean;

        const normV = Vector3.norm([vx, vy, vz]);
        const speed = (normV);
        const velocity = ({
          x: vx,
          y: vy,
          z: vz,
        });

        return {acceleration, speed, velocity}
    };
}

class Constants {
    static G = 9.81; // m/s^2
}