import { imgFolder } from "../utils/consts";

class BaseModel {
    isUndefined(value: any) {
        return typeof value === 'undefined';
    }

    formatValue(value: any, unit: string) {
        if (this.isUndefined(value)) {
            return '';
        }

        return `${value}${unit}`;
    }

    getWeatherImgByCode(code: number) {
        const imgExt = '.webp';

        if (code === 0) {
            return imgFolder.concat('icon-sunny').concat(imgExt);
        }

        if ([1, 2].includes(code)) {
            return imgFolder.concat('icon-overcast').concat(imgExt);
        }

        if ([3].includes(code)) {
            return imgFolder.concat('icon-overcast').concat(imgExt);
        }

        if ([45, 48].includes(code)) {
            return imgFolder.concat('icon-fog').concat(imgExt);
        }

        if ([51, 53, 55, 56, 57].includes(code)) {
            return imgFolder.concat('icon-drizzle').concat(imgExt);
        }

        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
            return imgFolder.concat('icon-rain').concat(imgExt);
        }

        if ([71, 73, 75, 77, 85, 86].includes(code)) {
            return imgFolder.concat('icon-snow').concat(imgExt);
        }

        if ([86, 95, 96, 99].includes(code)) {
            return imgFolder.concat('icon-storm').concat(imgExt);
        }

        return imgFolder.concat('icon-loading').concat('.svg');
    }
};

export default BaseModel;