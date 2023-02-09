import React from 'react';
import { IPosition, Tooltip as ReactToolTip } from 'react-tooltip';

interface Props {
  anchorId: string;
  position?: IPosition;
  visible?: boolean;
}

const Tooltip: React.FC<Props> = ({ anchorId, position = 'top', visible = true }) => {
  if (!visible) return null;
  return <ReactToolTip anchorId={anchorId} />;
};

export default Tooltip;
