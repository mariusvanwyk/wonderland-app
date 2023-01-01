import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import VehicleCategoriesList from './VehicleCategoriesList';
import {AxiosResponse} from 'axios';
import {CategoriesServices} from "../VehicleCategoriesServices";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {EmbeddedVehicleCategories, VehicleCategoriesPage} from "../../../model/VehicleCategoriesPage";
import {Page} from "../../../model/Page";

// jest.mock('axios');
// const mockedHttpService = HttpService as jest.Mocked<typeof HttpService>
// const mockedAxios = axios as jest.Mocked<typeof axios>;

class MockService implements CategoriesServices {
    getVehicleCategories(currentPage: number, size: number): Promise<AxiosResponse<VehicleCategoriesPage>> {

        const vehicleCategory: VehicleCategory = new VehicleCategory();
        vehicleCategory.name = "Large";

        const embedded: EmbeddedVehicleCategories = {
            vehicleCategories: [vehicleCategory]
        }

        const page: Page = {
            number: 0, size: 0, totalElements: 0, totalPages: 0
        }

        const vehicleCategoriesPage: VehicleCategoriesPage = {
            _embedded: embedded,
            page: page
        };
        const response: AxiosResponse<VehicleCategoriesPage> = {
            config: {},
            data: vehicleCategoriesPage,
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

    saveVehicleCategory(category: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const response: AxiosResponse<VehicleCategory> = {
            config: {},
            data: category,
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

    deleteVehicleCategory(id: number): Promise<AxiosResponse<VehicleCategory>> {
        const response: AxiosResponse<VehicleCategory> = {
            config: {},
            data: new VehicleCategory(),
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

    getVehicleCategory(id: number): Promise<AxiosResponse<VehicleCategory>> {
        const response: AxiosResponse<VehicleCategory> = {
            config: {},
            data: new VehicleCategory(),
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

    addVehicleCategory(category: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const response: AxiosResponse<VehicleCategory> = {
            config: {},
            data: new VehicleCategory(),
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

    getVehicleCategoriesByName(currentPage: number, size: number, name: string): Promise<AxiosResponse<VehicleCategoriesPage>> {
        const vehicleCategory: VehicleCategory = new VehicleCategory();
        vehicleCategory.name = "Large";

        const embedded: EmbeddedVehicleCategories = {
            vehicleCategories: [vehicleCategory]
        }

        const page: Page = {
            number: 0, size: 0, totalElements: 0, totalPages: 0
        }

        const vehicleCategoriesPage: VehicleCategoriesPage = {
            _embedded: embedded,
            page: page
        };
        const response: AxiosResponse<VehicleCategoriesPage> = {
            config: {},
            data: vehicleCategoriesPage,
            headers: {},
            status: 200,
            statusText: "OK"
        };
        return Promise.resolve(response);
    }

}

describe('App', () => {

    const renderComponent = () => (render(
        <VehicleCategoriesList
            refreshTimeRequest={Date.now()}
            onAdd={(category) => {
            }}
            onRefresh={() => {
            }}
            onSelect={(category) => {
            }}
            defaultSelectedId={null}
            services={new MockService()}
        />
    ));

    test('renders learn react link', async () => {

        const {getByText, getAllByRole} = renderComponent();


        fireEvent.click(getByText('Get users'));

        await waitFor(() => {
            // const userList = getAllByRole('listitem');
            // expect(userList).toHaveLength(2);
            // expect(userList[0]).toHaveTextContent('Joe Doe');
            // expect(userList[1]).toHaveTextContent('Jane Doe');
        });
    });
})
