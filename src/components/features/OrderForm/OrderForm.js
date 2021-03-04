import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';


const sendOrder = (options, tripCost, tripId, countryCode, tripName) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    countryCode,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if(
    options.name !== ''
    && options.contact !== ''
  ) {
    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
  else if(options.name === '' && options.cost !== ''){
    alert('Please fill your name!');
  }
  else if(options.name !== '' && options.cost === ''){
    alert('Please fill your contact info!');
  }
  else if(options.name === '' && options.cost === ''){
    alert('Please fill your name and contact info!');
  }
};


const OrderForm = ({tripCost, options, setOrderOption, tripId, countryCode, tripName, tripDuration}) => (
  <Row>
    {pricing.map(({...option}) => (
      <Col key={option.id} md={4}>
        <OrderOption
          setOrderOption={setOrderOption}
          currentValue={options[option.id]}
          title={option.id}
          {...option}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} tripDuration={tripDuration} />
      <Button onClick={() => sendOrder(options, tripCost, tripId, countryCode, tripName)}>Order now!</Button>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
  tripName: PropTypes.string,
  tripDuration: PropTypes.number,
};

export default OrderForm;
