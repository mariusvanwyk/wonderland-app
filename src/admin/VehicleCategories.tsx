import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./VehicleCategoryDetails";
import VehicleCategoriesList from "./VehicleCategoriesList";
import {VehicleCategory} from './model'


function VehicleCategories() {

    const [selected, setSelected] = useState<VehicleCategory | null | undefined>();
    const [refreshTime, setRefreshTime] = useState<number>(Date.now())

    const onSaved = () => {
        setRefreshTime(Date.now());
    }

    const onAdd = (category: VehicleCategory) => {
        setRefreshTime(Date.now());
        setSelected(category);
    }

    const deleteCategory = () => {
        setRefreshTime(Date.now());
        setSelected(null);
    }

    const refreshCategories = () => {
        setRefreshTime(Date.now());
        setSelected(null);
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={12} md={4} lg={3} className={"border-end"}>
                    <VehicleCategoriesList defaultSelected={selected}
                                           onSelect={(selectedCategory) => setSelected(selectedCategory)}
                                           onAdd={(newCategory) => onAdd(newCategory)}
                                           onRefresh={() => refreshCategories()}
                                           refreshTimeRequest={refreshTime}

                    />
                </Col>
                <Col sm={12} md={8} lg={9}>
                    {selected &&
                        <VehicleCategoryDetails selected={new VehicleCategory(selected.id, selected.name, selected.size,
                            selected.color, selected.description, selected.enabled)}
                                                onSaved={() => onSaved()}
                                                onDeleted={() => deleteCategory()}
                                                onClosed={() => setSelected(null)}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default VehicleCategories;
