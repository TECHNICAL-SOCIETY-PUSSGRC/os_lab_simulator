import '../styles/Home_blogs.css'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
import blog4 from '../assets/blog4.jpg'
import blog5 from '../assets/blog5.jpg'
import blog6 from '../assets/blog6.jpg'

const Home_blogs = () => {
  return (
    <div className='blogs  blog_container'>
      <h1>Operating Systems Blogs </h1>
      <p>Reading blogs are efficient way to learn </p>
     
      <main className="grid">
  <article>
  <img src={blog1} alt="blog img" />   
   <div className="text">
   <a  className='blog_title'  href='https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other.' target='_blank'>Multithreading VS Multiprocessing</a>

          <p className='blog_content'>In Multiprocessing, Many processes are executed simultaneously. While in multithreading, many threads of...</p>

     
  <button className="button-81" role="button"><a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other." target='_blank' >Read More</a></button>
  
    </div>
  </article>


  <article>
  <img src={blog2} alt="blog img" />
    <div className="text">
    <a className='blog_title' href="https://www.eletimes.com/microprocessor-vs-microcontroller-what-is-the-difference#:~:text=Ultimately%2C%20microcontrollers%20and%20microprocessors%20are,that%20connects%20to%20external%20peripherals." target='_blank'>Microcontroller vs Microprocessor</a>
    <p className='blog_content'>Microcontrollers and microprocessors are different ways of organizing and optimizing a...</p>

      <button className="button-81" role="button">    <a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other."target='_blank' >Read More</a>
</button>
    </div>
  </article>


  <article>
  <img src={blog3} alt="blog img" />
    <div className="text">
    <a  className='blog_title'href="https://www.crucial.in/articles/about-memory/what-is-the-difference-between-ram-and-rom#:~:text=RAM%20is%20volatile%20memory%20that,Find%20out%20more%20about%20RAM." target='_blank'>Difference between RAM and Rom</a>
    <p className='blog_content'>RAM is volatile memory that temporarily stores the files you are working on. ROM is non-volatile...</p>

      <button className="button-81" role="button">    <a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other." target='_blank'>Read More</a>
</button>
    </div>
  </article>


  <article>
  <img src={blog4} alt="blog img" />
    <div className="text">
    <a className='blog_title' href="https://www.tutorialspoint.com/semaphores-in-operating-system"  target='_blank'>What is Semaphore ?</a>
    <p className='blog_content'>A semaphore is a variable or abstract data type used to control access to a common resource by...</p>

      <button className="button-81" role="button">    <a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other."  target='_blank'>Read More</a>
</button>
    </div>
  </article>


  <article>
  <img src={blog5} alt="blog img" />
    <div className="text">
    <a className='blog_title' href="https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" target='_blank'>What is Deadlock ?</a>
    <p className='blog_content'>A deadlock is a condition that may happen in a system composed of multiple processes that can access...</p>

      <button className="button-81" role="button">    <a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other." target='_blank' >Read More</a>
</button>


    </div>
  </article>


  <article>
  <img src={blog6} alt="blog img" />
    <div className="text">
    <a className='blog_title'href="https://www.techopedia.com/definition/1115/storage#:~:text=Storage%20is%20a%20process%20through,data%2C%20either%20temporarily%20or%20permanently." target='_blank' >What is Storage ?</a>
    <p className='blog_content' >Storage is a process through which digital data is saved within a data storage device by means of...</p>

      <button className="button-81" role="button">    <a href="https://www.fusion-reactor.com/blog/multithreading-and-multiprocessing/#:~:text=A%20multiprocessing%20system%20has%20more,runs%20parallel%20to%20each%20other." target='_blank'>Read More</a>
</button>
    </div>
  </article>

  
</main>

    </div>
  )
}

export default Home_blogs