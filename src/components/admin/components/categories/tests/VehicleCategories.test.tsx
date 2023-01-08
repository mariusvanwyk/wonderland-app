import React from "react";
import {fireEvent, screen, waitFor, within} from "@testing-library/react";
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

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class MockServices extends VehicleCategoriesServices {

    categories: VehicleCategory[] = [];

    addItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const newItem = _.cloneDeep(item)
        newItem.id = 1;
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
        console.log("Retrieved Item: ", category)
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
                isAxiosError: false,
                toJSON: function (): object {
                    throw new Error("Function not implemented.");
                },
                name: "",
                message: ""
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

    saveItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const axiosResponse: AxiosResponse<VehicleCategory> = {
            config: {},
            data: item,
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

const inputValues: InputValue[] = [
    {id: "category.name", value: "Large Vehicles"},
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

test("Add and delete Vehicle Category Test", async () => {
    const mockServices: MockServices = new MockServices();
    await act(async () => {
        renderWithProviders(<VehicleCategories services={mockServices}/>)
    });
    act(() => {
        const heading = screen.getByText("Vehicle Categories");
        expect(heading).toBeInTheDocument();
    });
    act(() => {
        const noItems = screen.getByText("There are no items");
        expect(noItems).toBeInTheDocument();
    });
    act(() => {
        const addItemButton = screen.getByTestId("add-new-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    act(() => {
        const itemHeading = screen.getByTestId("item-heading");
        expect(itemHeading).toBeInTheDocument();
    });
    act(() => {
        const addItemButton = screen.getByTestId("add-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    act(() => {
        const validationFailedHeading = screen.getByText("Validation Failed");
        expect(validationFailedHeading).toBeInTheDocument();
    });
    inputValues.map((inputValue) => {
        act(() => {
            const input = screen.getByTestId(inputValue.id);
            expect(input).toBeInTheDocument();
            fireEvent.change(input, {target: {value: inputValue.value}});
        })
    });
    await act(async () => {
        const addItemButton = screen.getByTestId("add-item-button");
        expect(addItemButton).toBeInTheDocument();
        fireEvent.click(addItemButton);
    });
    // await delay(2000);
    await waitFor(() => {
        const oneRecord = screen.getByText("1 record");
        expect(oneRecord).toBeInTheDocument();
    });

    await act(async () => {
        const listItemZero = screen.getByTestId("list-item-0");
        expect(listItemZero).toBeInTheDocument();
        fireEvent.click(listItemZero);
    });

    act(() => {
        const {getByText} = within(screen.getByTestId("item-heading"))
        expect(getByText("Large Vehicles")).toBeInTheDocument()
    });
    act(() => {
        const deleteItemButton = screen.getByTestId("delete-item-button");
        expect(deleteItemButton).toBeInTheDocument();
        fireEvent.click(deleteItemButton);
    });
    act(() => {
        const deletionConfirmation = screen.getByText("Are you sure you want to delete this item?");
        expect(deletionConfirmation).toBeInTheDocument();
    });
    await act(async () => {
        const deleteItemButton = screen.getByTestId("delete-item-confirm-button");
        expect(deleteItemButton).toBeInTheDocument();
        fireEvent.click(deleteItemButton);
    });
    act(() => {
        const noItems = screen.getByText("There are no items");
        expect(noItems).toBeInTheDocument();
    });

});