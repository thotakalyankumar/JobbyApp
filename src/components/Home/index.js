import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <div className="Home-container">
      <Header />
      <div className="content">
        <h1 className="heading">
          Find The Job That <br /> Fit Your Job
        </h1>
        <p className="paragraph">
          Millions of people searching for jobs,salary <br />
          information,company reviews find the job that fits your <br /> ability
          and potential.
        </p>
        <button type="button" className="Find-button">
          Find Jobs
        </button>
      </div>
    </div>
  </>
)
export default Home
