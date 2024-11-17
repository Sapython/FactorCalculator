export type Reading = {
    kiloWattHours: number;
    kiloVoltAmpHour: number;
    date: Date;
    dateId: string;
    powerFactor: string;
    id?: string;
    kiloWattHoursImage?: string;
    kiloVoltAmpHourImage?: string;
}