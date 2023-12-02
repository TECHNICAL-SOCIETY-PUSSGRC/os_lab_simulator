import { useMemo } from "react"

const Cell = ({ rowIndex, cellIndex, data, setData, animateOpacity, isRunning }) => {
  const curCell = useMemo(() => {
    if(cellIndex === 0) return 'Pid'
    else if(cellIndex === 1) return 'AT'
    else if(cellIndex === 2) return 'BT'
  }, [cellIndex])
  
  const handleChangeValue = (e) => {
    const newData = [...data]
    newData[rowIndex][curCell] = e.target.value
    setData(newData)
  }

  return (
    <td className={`border-solid border py-3 transition-opacity duration-500 ease-in-out ${animateOpacity? 'opacity-0': 'opacity-100'}`}>
      <input
        type="text"
        name="cellValue"
        value={data[rowIndex][curCell]}
        onChange={handleChangeValue}
        placeholder={isRunning? "-": "0"}
        className='bg-transparent w-full text-center focus:outline-none'
        disabled={isRunning}
      />
    </td>
  )
}

export default Cell