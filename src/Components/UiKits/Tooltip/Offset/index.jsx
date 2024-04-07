import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { Btn, H5, ToolTip } from '../../../../AbstractElements';
import { Offsets } from '../../../../Constant';
import OffsetTooltip from './OffsetsTooltip';

const Offset = () => {
  const [tooltip, setTooltip] = useState(false);
  const toggle = () => setTooltip(!tooltip);
  const Data = [
    {
      id: 10,
      placement: 'top',
      tooltip: 'Tooltip title',
      btntext: '0px -20px',
      offset: '0px,20px'
    },
    {
      id: 11,
      placement: 'top',
      tooltip: 'Tooltip title',
      btntext: '20px 0px',
      offset: '20px,0px'
    },
    {
      id: 12,
      placement: 'top',
      tooltip: 'Tooltip title',
      btntext: '-30px -30px',
      offset: '-30px,-0px'
    }
  ];
  return (
    <Col sm="12">
      <Card>
        <CardHeader>
          <H5>{Offsets}</H5>
        </CardHeader>
        <CardBody>
          <div className="btn-showcase">
            <Btn attrBtn={{ color: 'primary', id: 'Tooltip-9', onClick: toggle }}>20px 20px</Btn>
            <ToolTip
              attrToolTip={{
                placement: 'top',
                isOpen: tooltip,
                target: 'Tooltip-9',
                toggle: toggle,
                //offset: '20px,20px'
              }} >
              {'Tooltip title'}
            </ToolTip>
            {Data.map((item) =>
              <OffsetTooltip key={item.id} item={item} />
            )}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Offset;