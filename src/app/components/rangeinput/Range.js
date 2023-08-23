"use client"
import { useVehicleContext } from '@/app/context/vehicleContext';
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 5;
const MIN = 0;
const MAX = 100;

const RangeInut = ({ rtl }) => {
  const [values, setValues] = useState([0, 50]);

  const {doPriceFilterVehicles}=useVehicleContext()

  const handleChange=async (values)=>{
    setValues(values)
    doPriceFilterVehicles({minPrice:values[0].toFixed(1),maxPrice:values[1].toFixed(1)})
try {
  
} catch (error) {
  
}

  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          handleChange(values)
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '10px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '2px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#d01818', '#ccc'],
                  min: MIN,
                  max: MAX,
                  rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '17px',
              width: '17px',
              borderRadius: '50%',
              outline:"none",
              border:"5px solid #d01818",
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
          
          </div>
        )}
      />
      <output className='flex w-[100%] justify-between items-center' style={{ marginTop: '30px' }} id="output">

        <div className='bg-[#fff] w-[100px] py-[5px] text-center'>
        {values[0].toFixed(1)}
        </div>
        - 
        <div className='bg-[#fff] w-[100px] py-[5px] text-center'>
        {values[1].toFixed(1)}
        </div>
      </output>
    </div>
  );
};

export default RangeInut;
