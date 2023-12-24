import { useMemo } from "react"

const Cell = ({ rowIndex, cellIndex, data, setData, animateOpacity, isRunning }) => {
  const curCell = useMemo(() => {
    if(cellIndex === 0) return 'Pid'
    else if(cellIndex === 1) return 'AT'
    else if(cellIndex === 2) return 'BT'
    else if(cellIndex === 3) return 'CT'
    else if(cellIndex === 4) return 'TAT'
    else if(cellIndex === 5) return 'WT'
  }, [cellIndex])

  const handleChangeValue = (e) => {
    const newData = [...data]
    newData[rowIndex][curCell] = e.target.value
    setData(newData)
  }


  return (
    <td 
      className={`py-3 transition-opacity duration-500 ease-in-out  ${animateOpacity? 'opacity-0': 'opacity-100'}`}
      style={{ 
        backgroundColor: isRunning? data[rowIndex]['bgColor'][curCell]: 'transparent',
        border: (isRunning && data[rowIndex]['bgColor'][curCell] === 'rgba(0, 143, 90, 0.6)')? '3px solid': '1px solid'
      }}
    >
      <input
        type="text"
        name="cellValue"
        value={data[rowIndex][curCell] !== null? data[rowIndex][curCell]: ''}
        onChange={handleChangeValue}
        placeholder={isRunning? "-": "0"}
        className='bg-transparent w-full text-center focus:outline-none'
        disabled={isRunning}
      />
    </td>
  )
}

export default Cell