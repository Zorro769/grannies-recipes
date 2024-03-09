const colorStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: '#1FB137',
    backgroundColor: 'black'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isFocused
          ? 'white'
          : undefined,
      borderColor: '#1FB137',
      color: isDisabled
        ? '#fff'
        : isSelected,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? 'black'
            : 'black'
          : undefined,
      },
    };
  },
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#1FB137',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: '#1FB137',
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    color: '#1FB137',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'black',
    borderColor: 'yellow',
    // maxWidth: '100px'
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'black',
      color: '#1FB137'
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#1FB137",
  }),
}
export default colorStyle;