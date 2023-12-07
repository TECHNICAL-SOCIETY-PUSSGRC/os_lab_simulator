 import { searchingAlgo } from '../components/doc-page-data'
 import { dynamicAlgo } from '../components/algorithmsContent/dynamicProgrammingContent'
 import { backTrackAlgo } from '../components/algorithmsContent/backtrackingAlgoContent'

 import { sortingAlgo } from '../components/algorithmsContent/sortingAlgoData'

 import { graphAlgos } from '../components/algorithmsContent/graphAlgoContent'

 import { AIalgos } from '../components/algorithmsContent/AI-algos-content'


// export default Docs
import '../styles/Docs.css'
import { Nav, Simulator } from '../components'
import { useState } from 'react'
import DefaultDocPage from '../components/DefaultDocPage'


const DocsPage = () => {
    const [defaultdoc,setDefaultDoc] = useState(1)
    const [active,setActive] = useState(true) 
    const [docs,setDocs]= useState(searchingAlgo);

    const [activeButton, setActiveButton] = useState('button1');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        // Perform any other actions you want when a button is clicked
};


  return (
    <div className='docs_page'>
      <div className='doc-nav-section' >
        <Nav />
        <h1>Documentation</h1>
        <div className='doc-cluster'>
            <h2>Choose Your Favourite Docs</h2>
        <div className='doc-btn-container'>

            <button className={`dac-page-tab ${activeButton === 'button1' ? 'active' : ''} `} onClick={()=>{
            setDefaultDoc(1);
            handleButtonClick('button1')}}  >CPU Scheduling</button>

            <button className={`dac-page-tab ${activeButton === 'button2' ? 'active' : ''} `}
             onClick={()=>{
                setDocs(AIalgos);
            setDefaultDoc(2)
            handleButtonClick('button2')
            
            }}  >AI Algorithms</button>

            <button className={`dac-page-tab ${activeButton === 'button3' ? 'active' : ''} `}onClick={()=>{setDocs(backTrackAlgo);
            setDefaultDoc(2)
            handleButtonClick('button3')
            }} >Backtracking Algorithms</button>

            <button className={`dac-page-tab ${activeButton === 'button4' ? 'active' : ''} `} onClick={()=>{setDocs(dynamicAlgo);
            setDefaultDoc(2)
            handleButtonClick('button4')
            }} >DP Algorithms</button>

            <button className={`dac-page-tab ${activeButton === 'button5' ? 'active' : ''} `} onClick={()=>{setDocs(searchingAlgo);
            setDefaultDoc(2)
            handleButtonClick('button5')
            }} >Searching Algorithms</button>

            <button className={`dac-page-tab ${activeButton === 'button6' ? 'active' : ''} `} onClick={()=>{setDocs(sortingAlgo);
            setDefaultDoc(2)
            handleButtonClick('button6')
            }}>Sorting Algorithms</button>

            <button className={`dac-page-tab ${activeButton === 'button7' ? 'active' : ''} `} onClick={()=>{setDocs(graphAlgos);
            setDefaultDoc(2)
            handleButtonClick('button7')
            }} >Graph Algorithms</button>

        </div>
        </div>
      </div>
      { defaultdoc===1?
        <DefaultDocPage/>: docs.map(({link,name,description,advantages,disadvantages,timeComplexity,spaceComplexity,applications})=>{
        return <div className="std-container" id="fcfs">
        <h1>{name}</h1>
        <p className='first-para'>{description}</p>
            <div className='doc-content-detail'>
            <h4>
            Advantages
        </h4> 
          {
            advantages.map((advantage)=>{
                return <p className='adv-para '>{advantage}</p>
            })
          }
        
        <p className='adv-para'>Logarithmic time complexity O(log n)</p>
        <p className='adv-para'>Well-suited for static and infrequently updated datasets </p>

        <h4>
            Disadvantages
        </h4>
        {
            disadvantages.map((disadvantage)=>{
                return <p className='adv-para '>{disadvantage}</p>
            })
          }

        <h4>
            TimeComplexity
        </h4>
        <p className='gen-para'>{timeComplexity}</p>

        <h4>
            TimeComplexity
        </h4>
        <p className='gen-para'>{spaceComplexity}</p>
        <h4>
            Applications
            
        </h4>
        {
            applications.map((application)=>{
                return <p className='adv-para '>{application}</p>
            })
          }
        <p className='gen-para'>Searching in databases and file systems</p>
        <p className='gen-para'>Finding an element in a sorted list</p>
        <p className='gen-para'>Used in computer graphics algorithms</p>

            </div>

            <button ><a href={link} target='_blank'>Read More</a></button>
       
        </div>

        })
        }
      
    </div>
    
  )
}

export default DocsPage



{/* <div className="std-container" id="fcfs">
        <h1>Binary Search</h1>
        <p className='first-para'>Binary Search is a divide-and-conquer search algorithm that efficiently finds a target value within a sorted array. It works by repeatedly dividing the search range in half.</p>
            <div className='doc-content-detail'>
            <h4>
            Advantages
        </h4>
        <p className='adv-para '>Efficient for large datasets</p>
        <p className='adv-para'>Logarithmic time complexity O(log n)</p>
        <p className='adv-para'>Well-suited for static and infrequently updated datasets </p>

        <h4>
            Disadvantages
        </h4>
        <p className='dis-para'>Applicable only to sorted arrays
        Requires sorted data, which may be an overhead
        Not suitable for dynamic datasets that frequently change</p>

        <h4>
            TimeComplexity
        </h4>
        <p className='gen-para'>O(log n)</p>

        <h4>
            TimeComplexity
        </h4>
        <p className='gen-para'>O(1)</p>
        <h4>
            Applications
            
        </h4>
        <p className='gen-para'>Searching in databases and file systems</p>
        <p className='gen-para'>Finding an element in a sorted list</p>
        <p className='gen-para'>Used in computer graphics algorithms</p>

            </div>

            <button>Read More</button>
       
        </div> */}