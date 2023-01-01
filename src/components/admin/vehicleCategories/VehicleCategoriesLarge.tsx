import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import VehicleCategoriesList from "./components/VehicleCategoriesList";
import {CategoriesServices, VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategory} from "../../model/VehicleCategory";

const services: CategoriesServices = new VehicleCategoriesServices();

function VehicleCategoriesLarge() {

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
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <VehicleCategoriesList defaultSelectedId={selectedId}
                                           onSelect={(id) => onSelect(id)}
                                           onAdd={(newCategory) => onAdd(newCategory)}
                                           onRefresh={() => refreshCategories()}
                                           refreshTimeRequest={refreshTime}
                                           services={services}

                    />
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {selectedId && selectTime &&
                        <VehicleCategoryDetails id={selectedId}
                                                requestTime={selectTime}
                                                onSaved={(saved) => onSaved(saved)}
                                                onDeleted={() => deleteCategory()}
                                                onClosed={() => setSelectedId(null)}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default VehicleCategoriesLarge;
