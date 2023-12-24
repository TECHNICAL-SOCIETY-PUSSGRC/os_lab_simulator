import { useMemo } from 'react';
import { useTable } from 'react-table';
import { Cell } from '.';
import { ShinyButton } from '..';
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from 'framer-motion'

const Table = ({ data, setData, setNoOfProcesses, animateOpacity, columns, isRunning }) => {
  const spring = useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleDeleteRow = (index) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
    setNoOfProcesses(newData.length)
  }

  return (
    <div className="flex flex-row mx-auto h-fit gap-4">
      {/* Table */}
      <table {...getTableProps()} className='w-[800px] border-collapse'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th 
                  {...column.getHeaderProps()} 
                  className='border-solid border border-[#ddd] py-3'
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          <AnimatePresence>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <motion.tr
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: '49px' }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  {...row.getRowProps({
                    layoutTransition: spring,
                  })}
                >
                    {row.cells.map((cell, cellIndex) => {
                        return (
                          <Cell 
                            key={rowIndex*100 + cellIndex} 
                            rowIndex={rowIndex} 
                            cellIndex={cellIndex} 
                            data={data} 
                            setData={setData}
                            animateOpacity={animateOpacity}
                            isRunning={isRunning}
                          />
                        )
                    })}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
      
      {/* DeleteRow Buttons */}
      {!isRunning && <div className='flex flex-col mt-12'>
        {
          data.map((row, index) => {
            return (
              <div key={index} className='flex items-center justify-end h-[49px]'>
                <ShinyButton
                  text={<ImCross />}
                  onClick={() => handleDeleteRow(index)}
                  className="p-2 text-xs rounded-full border border-gray-500 text-gray-500 hover:text-white hover:border-white"
                />
              </div>
            )
          })
        }
      </div>}
    </div>
  );
};

export default Table;