import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDate from './OrderOptionDate';
import OrderOptionText from './OrderOptionText';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  date: OrderOptionDate,
  text: OrderOptionText,
};

const OrderOption = ({id, setOrderOption, name, type, ...otherProps}) => {

  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
          name={name}
        />
      </div>
    );
  }
};

console.log('name', {name});

OrderOption.propTypes = {
  name: PropTypes.string,
  type: PropTypes.node,
  setOrderOption: PropTypes.func,
};

export default OrderOption;
