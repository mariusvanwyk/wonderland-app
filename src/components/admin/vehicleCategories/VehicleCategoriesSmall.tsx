import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import VehicleCategoriesList from "./components/VehicleCategoriesList";
import {CategoriesServices, VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategory} from "../../model/VehicleCategory";

const services: CategoriesServices = new VehicleCategoriesServices();

function VehicleCategoriesSmall() {

    const [selectedId, setSelectedId] = useState<number | null | undefined>();
    const [refreshTime, setRefreshTime] = useState<number>(Date.now())
    const [selectTime, setSelectTime] = useState<number | null | undefined>()

    const onSaved = (saved: VehicleCategory) => {
        setSelectedId(saved.id);
        setRefreshTime(Date.now());
    }

    const onSelect = (id: number) => {
        setSelectedId(id);
        setSelectTime(Date.now);
    }

    const onAdd = (id: number) => {
        setRefreshTime(Date.now());
        setSelectedId(id);
    }

    const deleteCategory = () => {
        setRefreshTime(Date.now());
        setSelectedId(null);
    }

    const refreshCategories = () => {
        setRefreshTime(Date.now());
        setSelectedId(null);
    }

    return (
        <Container fluid className={"h-100"}>
            {!selectedId && <VehicleCategoriesList defaultSelectedId={selectedId}
                                                   onSelect={(id) => onSelect(id)}
                                                   onAdd={(newCategory) => onAdd(newCategory)}
                                                   onRefresh={() => refreshCategories()}
                                                   refreshTimeRequest={refreshTime}
                                                   services={services}

            />}
            {selectedId && selectTime &&
                <VehicleCategoryDetails id={selectedId}
                                        requestTime={selectTime}
                                        onSaved={(saved) => onSaved(saved)}
                                        onDeleted={() => deleteCategory()}
                                        onClosed={() => setSelectedId(null)}
                />
            }
        </Container>
    );
}

export default VehicleCategoriesSmall;
