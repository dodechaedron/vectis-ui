import React, { ComponentPropsWithRef, useEffect, useRef } from 'react';
import * as qrCode from 'qrcode';

import { useVectis } from '~/providers';

const QRCode: React.FC<ComponentPropsWithRef<'canvas'>> = ({ ...props }) => {
  const { account } = useVectis();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    qrCode.toCanvas(canvasRef.current, account.address, { color: { dark: '#566fa1', light: '#fff' } });
  }, []);

  return <canvas {...props} ref={canvasRef} />;
};

export default QRCode;
