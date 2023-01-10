import React from "react";
import {fireEvent, screen, within} from "@testing-library/react";
import {EmbeddedVehicleCategories} from "../../../model/embedded/EmbeddedVehicleCategories";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {AxiosError, AxiosResponse} from "axios";
import {VehicleCategoriesServices} from "../../../services/VehicleCategoriesServices";
import {ResultPage} from "../../../model/base/ResultPage";
import {Page} from "../../../model/base/Page";
import _ from "lodash";
import VehicleCategories from "../VehicleCategories";
import {act} from "react-dom/test-utils";
import {renderWithProviders} from "./test-utils";

class MockServices extends VehicleCategoriesServices {

    categories: VehicleCategory[] = [];

    addItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const newItem = _.cloneDeep(item)
        newItem.id = 1;
        newItem.currentVersion = 0;
        this.categories = [...this.categories, newItem];
        const axiosResponse: AxiosResponse<VehicleCategory> = {
            config: {},
            data: newItem,
            headers: {},
            status: 200,
            statusText: ""

        };
        return Promise.resolve(axiosResponse);
    }

    deleteItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        this.categories = _.filter(this.categories, current => (!_.isEqual(current.id, item.id)));
        const axiosResponse: AxiosResponse<VehicleCategory> = {
            config: {},
            data: item,
            headers: {},
            status: 200,
            statusText: ""
        };
        return Promise.resolve(axiosResponse);
    }

    getItem(id: number | undefined): Promise<AxiosResponse<VehicleCategory>> {
        const category = _.find(this.categories, (current) => {
            return current.id === id
        })
        console.debug("Retrieved Item: ", category)
        if (category) {
            const axiosResponse: AxiosResponse<VehicleCategory> = {
                config: {},
                data: category,
                headers: {},
                status: 200,
                statusText: ""

            };
            return Promise.resolve(axiosResponse);
        } else {
            const axiosError: AxiosError<VehicleCategory> = {
                isAxiosError: true,
                toJSON: function (): object {
                    throw new Error("Function not implemented.");
                },
                name: "",
                message: "",
                status: 404
            }
            return Promise.reject(axiosError);
        }
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean):
        Promise<AxiosResponse<ResultPage<EmbeddedVehicleCategories>>> {
        console.debug("Categories length", this.categories.length)
        const page: Page = {
            size: this.categories.length,
            totalElements: this.categories.length,
            totalPages: 1,
            number: 0
        };
        const embedded: EmbeddedVehicleCategories = {
            vehicleCategories: this.categories
        };
        const resultPage: ResultPage<EmbeddedVehicleCategories> = {
            _embedded: embedded,
            page: page
        };
        const axiosResponse: AxiosResponse<ResultPage<EmbeddedVehicleCategories>> = {
            config: {},
            data: resultPage,
            headers: {undefined},
            status: 200,
            statusText: ""

        }
        return Promise.resolve(axiosResponse);
    }

    saveItem(updatedItem: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const cloned = _.cloneDeep(updatedItem);
        cloned.currentVersion = cloned.currentVersion + 1;
        console.debug("Cloned Update Item: ", cloned)
        this.categories = this.categories.map(item => item.id === cloned.id ? cloned : item);
        const axiosResponse: AxiosResponse<VehicleCategory> = {
            config: {},
            data: cloned,
            headers: {},
            status: 200,
            statusText: ""
        };
        return Promise.resolve(axiosResponse);
    }

}

type InputValue = {
    id: string,
    value: string
}

const LARGE_VEHICLES: string = "Large Vehicles";
const MEDIUM_VEHICLES: string = "Medium Vehicles";

const inputValues: InputValue[] = [
    {id: "category.name", value: LARGE_VEHICLES},
    {id: "category.size", value: "32"},
    {id: "category.roadTaxCost", value: "200"},
    {id: "category.insuranceCost", value: "1000"},
    {id: "category.trackerCost", value: "250"},
    {id: "category.extraCost", value: "500"},
    {id: "category.tireRate", value: "180"},
    {id: "category.serviceRate", value: "150"},
    {id: "category.overtimeRate", value: "400"},
    {id: "category.fuelConsumption", value: "45"},
]

const updateValues: InputValue[] = [
    {id: "category.name", value: MEDIUM_VEHICLES},
]

test("Update Vehicle Category Test", async () => {
    await render();
    await addNewRecord();
    await selectRecord(0, LARGE_VEHICLES);
    await updateRecord(updateValues);
    await refreshList();
    await selectRecord(0, MEDIUM_VEHICLES);
});

test("Add and Delete Vehicle Category Test", async () => {
    await render();
    await addNewRecord();
    await selectRecord(0, LARGE_VEHICLES);
    await deleteRecord();
});

const render = async () => {
    await act(async () => {
        renderWithProviders(<VehicleCategories initialServices={new MockServices()}/>)
    });
    // Check main heading
    await act(() => {
        const heading = screen.getByText("Categories");
        expect(heading).toBeInTheDocument();
    });
    // Check "There are no categories" text
    await act(() => {
        const noItems = screen.getByText("There are no categories");
        expect(noItems).toBeInTheDocument();
    });
}

const addNewRecord = async () => {
    // Click "add-new-item-button"
    await act(() => {
        const addItemButton = screen.getByTestId("add-new-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    // Check if "item-heading" exists
    await act(() => {
        const itemHeading = screen.getByTestId("item-heading");
        expect(itemHeading).toBeInTheDocument();
    });
    // click "add-item-button" (Validation should fail)
    await act(() => {
        const addItemButton = screen.getByTestId("add-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    // Check "Validation Failed" heading
    await act(() => {
        const validationFailedHeading = screen.getByText("Validation Failed");
        expect(validationFailedHeading).toBeInTheDocument();
    });
    // Loop input values and provide input
    inputValues.map((inputValue) => {
        act(() => {
            const input = screen.getByTestId(inputValue.id);
            expect(input).toBeInTheDocument();
            fireEvent.change(input, {target: {value: inputValue.value}});
        })
    });
    // click "add-item-button" (should be valid)
    await act(async () => {
        const addItemButton = screen.getByTestId("add-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    // Check "1 record"
    await act(() => {
        const oneRecord = screen.getByText("1 record");
        expect(oneRecord).toBeInTheDocument();
    });
}

const selectRecord = async (recordNumber: number, heading: string) => {
    // Click "list-item-0" from list
    await act(async () => {
        const listItemZero = screen.getByTestId("list-item-" + recordNumber);
        expect(listItemZero).toBeInTheDocument();
        fireEvent.click(listItemZero);
    });
    // Check "item-heading" = `${heading}`
    await act(() => {
        const {getByText} = within(screen.getByTestId("item-heading"))
        expect(getByText(heading)).toBeInTheDocument()
    });
}

const refreshList = async () => {
    // Click "refresh-list-button"
    await act(async () => {
        const refreshListButton = screen.getByTestId("refresh-list-button");
        expect(refreshListButton).toBeInTheDocument();
        fireEvent.click(refreshListButton);
    });
}

const deleteRecord = async () => {
    // Click "delete-item-button"
    await act(() => {
        const deleteItemButton = screen.getByTestId("delete-item-button");
        expect(deleteItemButton).toBeInTheDocument();
        fireEvent.click(deleteItemButton);
    });
    // Check "Are you sure you want to delete this item?" text
    await act(() => {
        const deletionConfirmation = screen.getByText("Are you sure you want to delete this item?");
        expect(deletionConfirmation).toBeInTheDocument();
    });
    // Click "delete-item-confirm-button"
    await act(async () => {
        const deleteItemButton = screen.getByTestId("delete-item-confirm-button");
        expect(deleteItemButton).toBeInTheDocument();
        fireEvent.click(deleteItemButton);
    });
    // Check "There are no categories" text
    await act(() => {
        const noItems = screen.getByText("There are no categories");
        expect(noItems).toBeInTheDocument();
    });
}

const updateRecord = async (updateValues: InputValue[]) => {
    updateValues.map((inputValue) => {
        act(() => {
            const input = screen.getByTestId(inputValue.id);
            expect(input).toBeInTheDocument();
            fireEvent.change(input, {target: {value: inputValue.value}});
        })
    });
    // Click "update-item-button"
    await act(async () => {
        const updateItemButton = screen.getByTestId("update-item-button");
        expect(updateItemButton).toBeInTheDocument();
        fireEvent.click(updateItemButton);
    });
}
