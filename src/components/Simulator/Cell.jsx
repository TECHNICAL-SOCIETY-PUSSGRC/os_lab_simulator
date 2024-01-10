const Cell = ({ rowIndex, cellID, data, setData, animateOpacity=false, isRunning=false, isDisabled=false }) => {
  const handleChangeValue = (e) => {
    const newData = [...data]
    newData[rowIndex][cellID] = e.target.value
    setData(newData)
  }

  return (
    <td 
      className={`py-3 transition-opacity duration-500 ease-in-out ${animateOpacity? 'opacity-0': 'opacity-100'}`}
      style={{ 
        backgroundColor: isRunning? data[rowIndex]['bgColor'][cellID]: 'transparent',
        border: (isRunning && data[rowIndex]['bgColor'][cellID] === 'rgba(0, 143, 90, 0.6)')? '3px solid': '1px solid'
      }}
    >
      <input
        type="text"
        name="cellValue"
        value={data[rowIndex][cellID] !== null? data[rowIndex][cellID]: ''}
        onChange={handleChangeValue}
        placeholder={isRunning? "-": "0"}
        className='bg-transparent w-full text-center focus:outline-none'
        disabled={isRunning || isDisabled}
      />
    </td>
  )
}

export default Cell