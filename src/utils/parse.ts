import type { DailyData } from "../contexts/daily-weather-context";

export const parseDailyWeatherFromApi = (dailyData: DailyData) => {
    const result: Record<string, any>[] = [];

    dailyData.time.map((_, i) => {
        const dailyParse: Record<string, any> = {};

        Object.keys(dailyData).forEach((key) => {
            dailyParse[key] = (dailyData as any)[key][i];
        });

        result.push(dailyParse);
    });

    return result;
};