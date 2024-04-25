import React, { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import DateTimePicker from 'react-datepicker';
import Styled from 'styled-components';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

const ArrowLeft = () => <img src={toAbsoluteUrl("/media/svg/arrow-left.svg")} alt="Arrow Left" style={{width: '10px'}} />;
const ArrowRight = () => <img src={toAbsoluteUrl("/media/svg/arrow-right.svg")} alt="Arrow Right" style={{width: '10px'}} />;

const StyledPicker = Styled.div`
  .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker-popper[data-placement^=bottom] {
    padding: 0;
    width: 280px!important;
    font-family: inherit;
    border: 0;
    border-radius: 0;
    box-shadow: var(--bs-dropdown-box-shadow);
    background-color: var(--bs-body-bg);
    border-radius: 0.65rem;
    max-height: 640px;
  }

  .react-datepicker {
    padding: 0 1rem;
    padding-top: 0.5rem;
    display: block;
    border: 0px;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__month-container {
    float: none;
  }

  .react-datepicker__header {
    background: transparent;
    padding: 0px;

  }

  .flatpickr-months .flatpickr-next-month, .flatpickr-months .flatpickr-prev-month {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-decoration: none;
    cursor: pointer;
    height: 34px;
    padding: 10px;
    z-index: 3;
    border: 0px;
    background: transparent;
    left: 0px;
    top: 0px;
    position: static;
  }

  .flatpickr-months {
    padding: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flatpickr-current-month {
    position: static;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  .flatpickr-month {
    overflow: inherit;
    flex: 1;
    height: auto;
    position: static;
  }
  .react-datepicker__day-names,
  .react-datepicker__week {
    margin: 0px;
    display: flex;
    justify-content: space-between;
  }
  .react-datepicker__day-name {
    color: var(--bs-gray-800);
    font-size: 1rem;
    font-weight: 600;
  }
  .react-datepicker__month {
    border: 0px;
  }

  

  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
    font-size: 1rem;
    border-radius: 0.65rem;
    box-shadow: none!important;
    height: 36px;
    width: 100%;
    max-width: 100%!important;
    margin: 0;
    line-height: 36px;
    color: var(--bs-gray-600);
    margin-top: 0!important;
    &.react-datepicker__day--outside-month {
      color: var(--bs-gray-400);
      background: 0 0;
      border-color: transparent;
    }
  }
  .react-datepicker__day--selected:hover, .react-datepicker__day--in-selecting-range:hover, .react-datepicker__day--in-range:hover, .react-datepicker__month-text--selected:hover, .react-datepicker__month-text--in-selecting-range:hover, .react-datepicker__month-text--in-range:hover, .react-datepicker__quarter-text--selected:hover, .react-datepicker__quarter-text--in-selecting-range:hover, .react-datepicker__quarter-text--in-range:hover, .react-datepicker__year-text--selected:hover, .react-datepicker__year-text--in-selecting-range:hover, .react-datepicker__year-text--in-range:hover {
    background: var(--bs-gray-100);
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
    background: var(--bs-gray-100);
    color: var(--bs-gray-600);
    border-color: transparent;
    font-weight: normal;
  }

  .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
    cursor: pointer;
    outline: 0;
    background: var(--bs-component-hover-bg);
    color: var(--bs-component-hover-color);
    border-color: transparent;
  }
`;

const CustomDateInput = forwardRef(({ error, value, onClick, placeHolder }, ref) => {

  return (
    <div className="position-relative d-flex align-items-center">
      <div className="symbol symbol-20px me-4 position-absolute ms-4">
        <span className="symbol-label bg-secondary">
          <i className="ki-outline ki-element-11"></i>
        </span>
      </div>
      <input
        className="form-control form-control-solid ps-12 flatpickr-input active"
        placeholder={placeHolder}
        onClick={onClick}
        ref={ref}
        value={value || ''}
        type="text"
        readOnly
      />
      {error && (
        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePicker = forwardRef(({ placeHolder, onChange, selected, error, label, required, ...props }, ref) => {
  
  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };


  return (
    <StyledPicker className="fv-row mb-7">
      {label && (
        <label className={clsx(' fs-6 fw-semibold mb-2', required && 'required')}>{label}</label>
      )}
      <div>
        <DateTimePicker
          wrapperClassName="w-full"
          customInput={<CustomDateInput placeHolder={placeHolder} value={selectedDate} onClick={handleDateChange} />}
          onChange={handleDateChange}
          selected={selectedDate}
          ref={ref || null}
          renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth }) => (
            <div className="flatpickr-months">
              <div className="flatpickr-prev-month cusor-pointer" onClick={decreaseMonth}>
                <ArrowLeft />
              </div>
              <div className="flatpickr-month">
                <div className="flatpickr-current-month p-0">
                  <select
                    className="flatpickr-monthDropdown-months"
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                  >
                    {months.map((item, key) => (
                      <option className="flatpickr-monthDropdown-month" value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div className="numInputWrapper">
                    <input
                      className="numInput cur-year"
                      type="number"
                      aria-label="Year"
                      onChange={(e) => changeYear(Number(e?.target?.value))}
                      value={getYear(date)}
                    />
                    <span className="arrowUp"></span>
                    <span className="arrowDown"></span>
                  </div>
                </div>
              </div>
              <div className="flatpickr-next-month cusor-pointer" onClick={increaseMonth}>
                <ArrowRight />
              </div>
            </div>
          )}
          {...props}
        />
        {error && (
          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
            {error}
          </div>
        )}
      </div>
    </StyledPicker>
  );
});

export default DatePicker