import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import VehicleCategoriesList from './VehicleCategoriesList';
import axios, {AxiosResponse} from 'axios';
import {EmbeddedVehicleCategories, Page, VehicleCategoriesPage, VehicleCategory} from "./model";
import {CategoriesServices} from "./VehicleCategoriesServices";

// jest.mock('axios');
// const mockedHttpService = HttpService as jest.Mocked<typeof HttpService>
// const mockedAxios = axios as jest.Mocked<typeof axios>;

class MockService implements CategoriesServices<AxiosResponse<VehicleCategoriesPage>> {
    getVehicleCategories(currentPage: number, size: number): Promise<AxiosResponse<VehicleCategoriesPage>> {
        const embedded: EmbeddedVehicleCategories = {
            vehicleCategories: [new VehicleCategory(0, "Large", 32, "blue", "Large Trucks", true)]
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
            defaultSelected={null}
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
