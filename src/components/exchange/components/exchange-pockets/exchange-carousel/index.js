import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import get from 'lodash/get';
import { Carousel } from 'react-responsive-carousel';
import { defaultCarouselConfiguration } from './config';

import './styles.css';

const ExchangeCarousel = ({ children, onChange, selectedItem }) => (
    // Here it would be better to have rates as an array, but since we received them from services in such way
    // I retrieved them by key onChange. Ideally should be by index from array
    <Carousel
        {...defaultCarouselConfiguration}
        selectedItem={selectedItem}
        onChange={index => onChange(get(children[index], 'key'))}
    >
        {children}
    </Carousel>
);

ExchangeCarousel.propTypes = {
    children: PropTypes.any,
    selectedItem: PropTypes.number,
    onChange: PropTypes.func,
};

ExchangeCarousel.defaultProps = {
    onChange: noop,
    selectedItem: 0,
};

export default ExchangeCarousel;
