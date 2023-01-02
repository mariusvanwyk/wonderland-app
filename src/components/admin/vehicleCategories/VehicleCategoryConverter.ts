import {Converter} from "../Converter";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {EmbeddedVehicleCategories} from "../model/EmbeddedVehicleCategories";

export class VehicleCategoryConverter implements Converter<EmbeddedVehicleCategories, VehicleCategory> {
    convert(resultPage: ResultPage<EmbeddedVehicleCategories>): ListPage<VehicleCategory> {
        return {
            items: resultPage._embedded.vehicleCategories,
            page: resultPage.page
        };
    }

    newItem(): VehicleCategory {
        return new VehicleCategory();
    }

    from(original: VehicleCategory): VehicleCategory {
        return VehicleCategory.from(original);
    }

}