import React, { Fragment } from 'react';
import Board from '@asseinfo/react-kanban';
import { Col, Card, CardBody } from 'reactstrap';
import { DragOnlyCard } from '../../../../Constant';
import HeaderCard from '../../../Common/Component/HeaderCard';

const DragCardOnlyClass = () => {
    const board1 = {
        columns: [
            {
                id: 3,
                title: 'Heading Card',
                cards: [
                    {
                        id: 3,
                        description: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                    },
                ]
            },
            {
                id: 4,
                title: 'Without Shadow',
                cards: [
                    {
                        id: 4,
                        description: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.'
                    },
                ]
            },
        ]
    };
    return (
        <Fragment>
            <Col sm="12">
                <Card>
                    <HeaderCard title={DragOnlyCard} />
                    <CardBody className="draggable-card">
                        <Board
                            initialBoard={board1}
                            disableCardDrag
                        >{board1}</Board>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default DragCardOnlyClass;