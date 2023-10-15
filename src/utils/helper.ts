import { WineDataset } from "../config/dataset";
import { FlavanoidConstants, GammaConstants, TableType } from "./constants";

// Filtering wine based on Alcohol's class
const filteredWineClassData = (alcoholClass: number) => {
    return WineDataset.filter((data: any) => {
        return data?.Alcohol === alcoholClass
    })
}

export const alcoholClasses = (): number[] => {
    const numberOfClasses: number[] = [];
    WineDataset.forEach(data => {
        if (!numberOfClasses.includes(data?.Alcohol))
            numberOfClasses.push(data?.Alcohol);
    })
    return numberOfClasses;
}

// function to calculate gamma value for filtered wines
export const calculateGamma = (alcoholClass: number) => {
    const filteredData = filteredWineClassData(alcoholClass);
    return filteredData.map((data: any) => {
        const { Ash, Hue, Magnesium } = data;
        return +((Ash * Hue) / Magnesium).toFixed(3);
    })
}

export const mean = (alcoholClass: number, tableType: string) => {
    let meann = 0;
    if (alcoholClass === -99) {
        return tableType === TableType.FLAVANOID ? FlavanoidConstants.FLAVANOID_MEAN : GammaConstants.GAMMA_MEAN;
    }
    else {
        if(tableType===TableType.FLAVANOID) {
            const filteredData = filteredWineClassData(alcoholClass);
            meann = filteredData.reduce((acc: number, obj: any) => {
                return acc + parseFloat(obj.Flavanoids)
            }, 0) / filteredData.length;
        }
        else {
            const gammaArray = calculateGamma(alcoholClass);
            meann = gammaArray.reduce((acc: number, value: number) => {
                return acc+value;
            }, 0)/gammaArray.length;
        }
        return meann.toFixed(3);
    }
}

export const median = (alcoholClass: number, tableType: string) => {
    let median: number = 0;

    if (alcoholClass === -99) {
        return tableType === TableType.FLAVANOID ? FlavanoidConstants.FLAVANOID_MEDIAN : GammaConstants.GAMMA_MEDIAN;
    }
    else {
        if(tableType===TableType.FLAVANOID) {
            const filteredData = filteredWineClassData(alcoholClass);
            const sortedData: any = filteredData.sort((a: any, b: any) => a.Flavanoids - b.Flavanoids);
            const length = Math.floor(sortedData.length / 2);
            if (sortedData.length % 2 === 0) {
                median = (parseFloat(sortedData[length - 1].Flavanoids) + parseFloat(sortedData[length].Flavanoids)) / 2;
            }
            else {
                median = (parseFloat(sortedData[length - 1].Flavanoids));
            }
        }
        else {
            const gammaArray = calculateGamma(alcoholClass);
            const sortedGammaArray = gammaArray.sort((a:number, b:number) => a-b);
            const length = Math.floor(sortedGammaArray.length / 2);
            if (sortedGammaArray.length % 2 === 0) {
                median = (sortedGammaArray[length - 1] + sortedGammaArray[length])/ 2;
            }
            else {
                median = sortedGammaArray[length - 1];
            }
        }
        return median.toFixed(3);
    }
}

export const mode = (alcoholClass: number, tableType: string) => {
    let modes = [];
    let count: any = [];
    let number;
    let maxIndex = 0;

    if (alcoholClass === -99) {
        return tableType === TableType.FLAVANOID ? FlavanoidConstants.FLAVANOID_MODE : GammaConstants.GAMMA_MODE;
    }
    else {
        if(tableType===TableType.FLAVANOID) {
            const filteredData = filteredWineClassData(alcoholClass);
            for (let i = 0; i < filteredData.length; i += 1) {
                number = filteredData[i];
                count[number?.Flavanoids] = (count[number?.Flavanoids] || 0) + 1;
                if (parseFloat(count[number?.Flavanoids]) > maxIndex) {
                    maxIndex = parseFloat(count[number?.Flavanoids]);
                }
            }
    
            for (let i in count) {
                if (count.hasOwnProperty(i)) {
                    if (count[i] === maxIndex) {
                        modes.push(Number(i));
                    }
                }
            }
        }
        else {
            const filteredData = calculateGamma(alcoholClass);
            for (let i = 0; i < filteredData.length; i += 1) {
                number = filteredData[i];
                count[number] = (count[number] || 0) + 1;
                if (parseFloat(count[number]) > maxIndex) {
                    maxIndex = parseFloat(count[number]);
                }
            }
    
            for (let i in count) {
                if (count.hasOwnProperty(i)) {
                    if (count[i] === maxIndex) {
                        modes.push(Number(i));
                    }
                }
            }
        }
        return modes.join(", ");
    }
}