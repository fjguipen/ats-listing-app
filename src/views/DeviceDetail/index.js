import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCT } from '../../state/product/rest/queries';

export const DeviceDetail = (props) => {
  const { deviceId } = useParams();
  const { data, loading, errors } = useQuery(GET_PRODUCT, {
    variables: {
      id: deviceId
    }
  });

  return (
    <>
      <Link to="/devices">Back</Link>
      <br />
      <br />
      {data?.product && <div className="device">{data.product.model}</div>}
    </>
  );
};
